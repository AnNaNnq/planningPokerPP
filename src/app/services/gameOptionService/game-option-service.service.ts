import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameOptionServiceService {
  private data = new BehaviorSubject<any>(null);
  data$ = this.data.asObservable();
  setData(newData: any) {
    this.data.next(newData);
  }
}
