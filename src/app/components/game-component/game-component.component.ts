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
import {translateType} from "@angular/compiler-cli/src/ngtsc/translator";
import {TranslateService} from "@ngx-translate/core";

/**
 * Class that manages game display
 * @implements AfterViewInit
 * @implements OnInit
 */
@Component({
  selector: 'game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.scss']
})
export class GameComponentComponent implements AfterViewInit, OnInit {

  /**
   * Class constructor
   * @param dataService {GameOptionServiceService} Contains data to start the game
   * @param router {Router} site router
   * @param translate
   */
  constructor(private dataService: GameOptionServiceService, private router: Router, public translate: TranslateService) {
  }

  /**
   * Game data
   */
  game: Game | undefined;

  /**
   * Class to display elements on the page
   */
  htmlDisplay: HtmlDisplay | undefined;

  /**
   * List of available notes
   */
  listValue = ["0", "1", "2", "3", "5", "8", "20", "40", "100", "?", "cafe"]

  /**
   * Singleton containing andlocations for HTML elements
   */
  balise: HtmlBalise | undefined;

  /**
   * If the bare is open
   */
  opened = false;

  /**
   * Standar value
   */
  standarValue: string = ""
  /**
   * Backlog
   */
  backlogValue: string = ""

  /**
   * @ignore
   */
  ngOnInit(): void {
  }

  /**
   * Function that starts the game after the page has loaded
   */
  ngAfterViewInit(): void {
    this.balise = HtmlBalise.getInstance();
    this.balise.playerButton.style.display = 'none';
    this.htmlDisplay = new HtmlDisplay();
    this.game = new GameConcret();
    if (this.getMode() == "strict") this.game = new StrictDecorator(this.game, this.translate);
    else if (this.getMode() == "moyenne") this.game = new AverageDecorator(this.game, this.translate);
    else if (this.getMode() == "majabs") this.game = new MajabsDecorator(this.game, this.translate);
    else this.game = new StrictDecorator(this.game, this.translate)
    this.setPlayers()

    if (this.isContinue()) {
      this.setBacklogNote()
      this.game.continueGame(this.getDefaultValue(), this.getActuelLog());

    } else {
      this.setBacklog()
      this.game.chooseDefaultValue();
    }
  }

  /**
   * Get Game Mode
   */
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

  /**
   * Are we back in the game
   */
  isContinue(): boolean {
    let cont = false;
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        Object.keys(data).forEach(key => {
          if (key.startsWith("Default")) {
            cont = true;
          }
        })
      }
    })
    return cont;
  }

  /**
   * Set Player in game
   */
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

  /**
   * Set Backlog Data
   */
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
        backlogData["Boutton Start"] = -1;
        backlogData["Boutton Quiter"] = -1;
      }
    });
    this.game?.setBacklogData(backlogData)
  }

  /**
   * Get Note
   * @param id Id of the player who set the note
   */
  getNote(id: number): number {
    let n = 0

    this.dataService.data$.subscribe(data => {
      Object.keys(data).forEach(key => {
        if (key.startsWith('Note' + id)) {
          n = data[key];
        }
      })
    })

    return n
  }

  /**
   * retrieves the function currently noted
   */
  getActuelLog(): number {
    let n = 0;
    this.dataService.data$.subscribe(data => {
      Object.keys(data).forEach(key => {
        if (key.startsWith('actualLog')) {
          n = data[key];
        }
      })
    })
    return n;
  }

  /**
   * Get default value
   */
  getDefaultValue(): string {
    let n = "";
    this.dataService.data$.subscribe(data => {
      Object.keys(data).forEach(key => {
        if (key.startsWith('Default')) {
          n = data[key];
        }
      })
    })
    return n;
  }

  /**
   * Add a not to the Backlog
   */
  setBacklogNote() {
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

  /**
   * Function that starts when a button is pressed
   * @param id function identifier
   */
  selectButton(id: string) {
    this.game?.playerPushButton(id)
  }

  /**
   * Function that starts when the player presses the button continue
   */
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

    if (this.game != null) {
      this.backlogValue = ""
      this.standarValue = this.game.getDefaultValue()
      console.log(this.game.getDefaultValue())
      const max = this.game.getActualStage();
      let n = 0
      Object.keys(this.game.getBacklogData()).forEach(key => {
        if (n < max && this.game?.getBacklogData()[key] != -1) {
          this.backlogValue += key + " : ";
          this.backlogValue += this.game?.getBacklogData()[key] + "\n";
        }
        n++
      })
    }

  }
}
