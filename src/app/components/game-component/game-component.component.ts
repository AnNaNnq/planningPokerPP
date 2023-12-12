import {Component, OnInit} from '@angular/core';
import {GameOptionServiceService} from "../../services/gameOptionService/game-option-service.service";

@Component({
  selector: 'game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.scss']
})
export class GameComponentComponent implements  OnInit{
  receivedData: any;

  constructor(private dataService : GameOptionServiceService) {}

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      this.receivedData = data;
    });
  }
}
