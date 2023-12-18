import {Component, OnInit} from '@angular/core';
import {GameOptionServiceService} from "../../services/gameOptionService/game-option-service.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit{

  constructor(private dataService: GameOptionServiceService) {}

  ngOnInit(): void {
      const button = document.getElementById("contniue-button") as HTMLButtonElement
      button.style.display = "none"
  }
  Data: { [Type: string]: string} = {}
  BacklogData: { [key : string]: number } = {};
  mode = ""
  defaultValue = ""
  players : string[] = []
  actualLog = 0;

  onFileSelected(event: any = 0){
    this.players = [];
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as string;
      const jsonData = JSON.parse(fileContent);
      // Extract names from JSON using keys

      this.mode = jsonData.mode
      this.defaultValue = jsonData.default

      for (const key in jsonData.Backlog) {
        if (jsonData.Backlog.hasOwnProperty(key)) {
          const item = jsonData.Backlog[key];
          for (const itemName in item) {
            if (item.hasOwnProperty(itemName) && itemName !== 'work') {
              this.BacklogData[itemName] = item[itemName] as number
            }
          }
        }
      }

      for(const key in jsonData.Players){
        if (jsonData.Players.hasOwnProperty(key)) {
          const item : string = jsonData.Players[key];
          this.players.push(item);
        }
      }

      for (const key in jsonData.Backlog) {
        if (jsonData.Backlog.hasOwnProperty(key)) {
          const item = jsonData.Backlog[key];
          if (!item.work) {
            this.actualLog = parseInt(key) - 1;
            break;
          }
        }
      }

      console.log(this.mode, this.defaultValue, this.BacklogData, this.players, this.actualLog)

      setTimeout(() => {
        const button = document.getElementById("contniue-button") as HTMLButtonElement
        button.style.display = "flex"
      }, 0);
    };
    reader.readAsText(selectedFile);
  }

  sendData(){
    Object.keys(this.players).forEach(key => {
      const playerKey = parseInt(key, 10)
      const strKey = "Player" + playerKey;
      this.Data[strKey] = this.players[playerKey];
    });

    this.Data["Mode"] = this.mode;
    this.Data["Default"] = this.defaultValue;
    this.Data["actualLog"] = this.actualLog + "";

    Object.keys(this.BacklogData).forEach((item: string, index: number) => {
      this.Data["Backlog" + index] = item;
      this.Data["Note" + index] = this.BacklogData[item] + ""
    });

    console.log("data", this.Data);
    this.dataService.setData(this.Data);
  }
}
