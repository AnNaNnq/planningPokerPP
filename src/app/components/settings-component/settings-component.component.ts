import { Component } from '@angular/core';

@Component({
  selector: 'settings-component',
  templateUrl: './settings-component.component.html',
  styleUrls: ['./settings-component.component.scss']
})
export class SettingsComponentComponent {

  BacklogData: string[] = [];

  playerMax: number = 15;

  mode = "Classique";

  playerNumber: number = 2;
  Players: { [key: number]: string} = {

  }
  playersNb: number[] = [1,2]

  getSliderValue(event:any=0) {
    this.playerNumber = event.target.value;
    this.playersNb = []
    for(let i = 1; i <= this.playerNumber; i++){
      this.playersNb.push(i)
    }
  }

  addPlayerName(event: any = 0) {
    if(event.target.value.length > 0){
      const placeholder = event.target.placeholder;
      const match = placeholder.replace(/[^\d]/g, "");
      const id = parseInt(match);
      this.Players[id] = event.target.value;
      console.log(this.Players);
    }
  }

  changeMod(event: any = 0){
    this.mode = event.target.value;
    console.log(this.mode);
  }

  onFileSelected(event: any = 0){
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
}
