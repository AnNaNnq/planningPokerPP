import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

/**
 * Service for transmitting data from one scene to another in JSON <br>
 * This allows you to send data to save data when creating a scene
 * or when resuming a game from the main menu
 */
@Injectable({
  providedIn: 'root'
})
export class GameOptionServiceService {

  /**
   * Variable containing the data sent
   * @private
   */
  private data = new BehaviorSubject<any>(null);

  /**
   * Variable used to retrieve sent data
   */
  data$ = this.data.asObservable();

  /**
   * Function for sending data from one component to another
   * @param {any} newData Data to be passed from one component to another
   * @return {void}
   */
  setData(newData: any): void {
    this.data.next(newData);
  }
}
