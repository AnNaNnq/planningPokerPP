import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Game} from "../../classes/decorateur/Game";
import {GameConcret} from "../../classes/decorateur/GameConcret";
import {StrictDecorator} from "../../classes/decorateur/StrictDecorator";
import {GameOptionServiceService} from "../../services/gameOptionService/game-option-service.service";
import {HtmlDisplay} from "../../classes/facade/HtmlDisplay";
import {HtmlBalise} from "../../classes/singleton/htmlBalise";
import {Router} from "@angular/router";
import {AverageDecorator} from "../../classes/decorateur/AverageDecorator";
import {MajabsDecorator} from "../../classes/decorateur/MajabsDecorator";

@Component({
  selector: 'game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.scss']
})
export class GameComponentComponent implements AfterViewInit, OnInit {

  constructor(private dataService: GameOptionServiceService, private router: Router) {
  }

  game: Game | undefined;

  htmlDisplay: HtmlDisplay | undefined;

  listValue = ["0", "1", "2", "3", "5", "8", "20", "40", "100", "?", "cafe"]

  balise: HtmlBalise | undefined;

  opened = false;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.balise = HtmlBalise.getInstance();
    this.balise.playerButton.style.display = 'none';
    this.htmlDisplay = new HtmlDisplay();
    this.game = new GameConcret();
    if (this.getMode() == "strict") this.game = new StrictDecorator(this.game);
    else if (this.getMode() == "moyenne") this.game = new AverageDecorator(this.game);
    else if (this.getMode() == "majabs") this.game = new MajabsDecorator(this.game);
    else this.game = new StrictDecorator(this.game)
    this.setPlayers()

    if(this.isContinue()){
      this.setBacklogNote()
      this.game.continueGame(this.getDefaultValue(), this.getActuelLog());

    }else {
      this.setBacklog()
      this.game.chooseDefaultValue();
    }
  }

  getMode(): string {
    let mode = "strict"
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        Object.keys(data).forEach(key => {
          if (key.startsWith('Mode')) {
            mode = data[key];
          }
        });
      }
    });
    return mode
  }

  isContinue(): boolean{
    let cont = false;
    this.dataService.data$.subscribe(data => {
      if (data != null){
        Object.keys(data).forEach(key => {
          if(key.startsWith("Default")){
            cont = true;
          }
        })
      }
    })
    return cont;
  }

  setPlayers() {
    let players: { [key: number]: string } = {}
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        Object.keys(data).forEach(key => {
          if (key.startsWith('Player')) {
            const playerNumber = parseInt(key.replace('Player', ''), 10);
            players[playerNumber] = data[key];
          }
        });
      } else {
        players[1] = "Michel";
        players[2] = "Patrick";
      }
    });
    this.game?.setPlayers(players)
  }

  setBacklog() {
    let backlogData: { [key: string]: number } = {};
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        Object.keys(data).forEach(key => {
          if (key.startsWith('Backlog')) {
            backlogData[data[key]] = 1;
          }
        });
      } else {
        backlogData["Boutton Start"] = 1;
        backlogData["Boutton Quiter"] = 1;
      }
    });
    this.game?.setBacklogData(backlogData)
  }

  getNote(id: number): number{
    let n = 0

    this.dataService.data$.subscribe(data => {
      Object.keys(data).forEach(key => {
        if(key.startsWith('Note' + id)){
          n = data[key];
        }
      })
    })

    return n
  }

  getActuelLog(): number{
    let n = 0;
    this.dataService.data$.subscribe(data => {
      Object.keys(data).forEach(key => {
        if(key.startsWith('actualLog')){
          n = data[key];
        }
      })
    })
    return n;
  }

  getDefaultValue(): string{
    let n = "";
    this.dataService.data$.subscribe(data => {
      Object.keys(data).forEach(key => {
        if(key.startsWith('Default')){
          n = data[key];
        }
      })
    })
    return n;
  }

  setBacklogNote(){
    let backlogData: { [key: string]: number } = {};
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        Object.keys(data).forEach(key => {
          if (key.startsWith('Backlog')) {
            backlogData[data[key]] = this.getNote(parseInt(key.match(/\d+/)?.[0] || ''));
          }
        });
      } else {
        backlogData["Boutton Start"] = 1;
        backlogData["Boutton Quiter"] = 1;
      }
    });
    this.game?.setBacklogData(backlogData)
  }

  selectButton(id: string) {
    this.game?.playerPushButton(id)
  }

  valideStage() {
    if (this.game?.setupDefaultValue()) {
      const valueElement = document.getElementById("stage1") as HTMLInputElement;
      if (valueElement.value != "") {
        this.game?.setDefaultValue(valueElement.value)
      }
    } else {

      if (this.game?.isDownload()) {
        this.game?.creatAndDownloadJSON();
        this.router.navigateByUrl('/').then(r => true);
      } else {
        if (this.game?.isRetry()) {
          this.game?.setActualPlayerTurn(1);
          this.game?.lunchStage();
        } else {
          if (this.game != null) {
            if (this.game.getActualStage() < Object.keys(this.game.getBacklogData()).length) {
              this.game.setActualPlayerTurn(1);
              this.game.nextStage();
            } else {
              this.game.end();
            }
          }
        }
      }
    }
  }
}
