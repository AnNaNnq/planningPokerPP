import { Component } from '@angular/core';

@Component({
  selector: 'settings-component',
  templateUrl: './settings-component.component.html',
  styleUrls: ['./settings-component.component.scss']
})
export class SettingsComponentComponent {

  playerMax: number = 15;

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
    }
  }
}
