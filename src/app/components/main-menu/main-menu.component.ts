import {Component, OnInit} from '@angular/core';
import {GameOptionServiceService} from "../../services/gameOptionService/game-option-service.service";

/**
 * Component that create page for the main menu of the website. We can choose here if we want to start a
 * new game or load a game from a json file.
 */
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit{

  /**
   * Component that create page for the main menu of the website. We can choose here if we want to start a
   * new game or load a game from a json file.
   */
  constructor(private dataService: GameOptionServiceService) {}

  /**
   * Defines whether the popup is already displayed or not
   */
  popupIsOpen = false

  /**
   * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked. It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
      const button = document.getElementById("contniue-button") as HTMLButtonElement
      button.style.display = "none";
      const popup = document.getElementById("popup") as HTMLDivElement;
      popup.style.display = "none";
  }

  /**
   * Data sent to the game in JSON format
   */
  Data: { [Type: string]: string} = {}
  /**
   * Backlog list retrieve JSON file
   */
  BacklogData: { [key : string]: number } = {};
  /**
   * Select game mode
   */
  mode = ""
  /**
   * Standard value used
   */
  defaultValue = ""
  /**
   * List of players in the game
   */
  players : string[] = []
  /**
   * First Backlog not yet graded
   */
  actualLog = 0;

  /**
   * Function to save data from the input JSON file as a variable for use in the game
   * @param event {event} con contains the JSON file
   */
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

  /**
   * Function to send previously recorded data to game-option-service for in-game use
   */
  sendData(){
    Object.keys(this.players).forEach(key => {
      const playerKey = parseInt(key, 10)
      const strKey = "Player" + (playerKey + 1);
      this.Data[strKey] = this.players[playerKey];
    });

    this.Data["Mode"] = this.mode;
    this.Data["Default"] = this.defaultValue;
    this.Data["actualLog"] = (this.actualLog + 1) + "";

    Object.keys(this.BacklogData).forEach((item: string, index: number) => {
      this.Data["Backlog" + index] = item;
      this.Data["Note" + index] = this.BacklogData[item] + ""
    });

    console.log("data", this.Data);
    this.dataService.setData(this.Data);
  }

  /**
   * Opens or closes popup window when information button is clicked
   */
  openInformation(){
    const popup = document.getElementById("popup") as HTMLDivElement;
    if(this.popupIsOpen) popup.style.display = "none";
    else popup.style.display = "block";
    this.popupIsOpen = !this.popupIsOpen;
  }
}
