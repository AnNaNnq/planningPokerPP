import {Component} from '@angular/core';
import {GameOptionServiceService} from "../../services/gameOptionService/game-option-service.service";

/**
 * Component that create the page where the user will choose every option for his game.
 */
@Component({
  selector: 'settings-component',
  templateUrl: './settings-component.component.html',
  styleUrls: ['./settings-component.component.scss']
})

export class SettingsComponentComponent {
  /** @ignore */
  constructor(private dataService: GameOptionServiceService) {
  }

  /**
   * Data that will be passed to the game
   */
  Data: { [Type: string]: string } = {}

  /**
   * Backlog list retrieve JSON file
   */
  BacklogData: string[] = [];

  /**
   * Maximum number of players per game
   */
  playerMax: number = 15;

  /**
   * Select game mode
   */
  mode = "strict";

  /**
   * Current number of players
   */
  playerNumber: number = 2;
  /**
   * List of players
   */
  Players: { [key: number]: string } = {}
  /** @ignore */playersNb: number[] = [1, 2]

  /**
   * Modifies the number of players by the slider value
   * @param event slider value
   */
  getSliderValue(event: any = 0) {
    this.playerNumber = event.target.value;
    this.playersNb = []
    for (let i = 1; i <= this.playerNumber; i++) {
      this.playersNb.push(i)
    }
  }

  /**
   * Changes the name of the player whose name has just been entered
   * @param event input text value
   */
  addPlayerName(event: any = 0) {
    if (event.target.value.length > 0) {
      const placeholder = event.target.placeholder;
      const match = placeholder.replace(/\D/g, "");
      const id = parseInt(match);
      this.Players[id] = event.target.value.substring(0, 7);
      console.log(this.Players);
    }
  }

  /**
   * Change game mode
   * @param event value of check box
   */
  changeMod(event: any = 0) {
    this.mode = event.target.value;
    console.log(this.mode);
  }

  /**
   * Changes backlog values based on imported JSON file
   * @param event JSON file
   */
  onFileSelected(event: any = 0) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as string;
      const jsonData = JSON.parse(fileContent);

      // Extract names from JSON using keys
      const namesArray: string[] = [];
      for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key) && jsonData[key]?.name) {
          namesArray.push(jsonData[key].name);
        }
      }
      this.BacklogData = namesArray;
      setTimeout(() => {
        console.log(this.BacklogData);
      }, 0);
    };
    reader.readAsText(selectedFile);
  }

<<<<<<< HEAD
  /**
   * Sends data to the game
   */
  sendData(){
=======
  sendData() {
>>>>>>> origin/dev-anna
    console.log("test");
    Object.keys(this.Players).forEach(key => {
      const playerKey = parseInt(key, 10)
      const strKey = "Player" + playerKey;
      this.Data[strKey] = this.Players[playerKey];
    });

    this.Data["Mode"] = this.mode;

    this.BacklogData.forEach((item: string, index: number) => {
      this.Data["Backlog" + index] = item;
    });

    this.dataService.setData(this.Data);
  }

  protected readonly console = console;
}
