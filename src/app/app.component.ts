import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

/**
 * Main component that display everything.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  /**
   * @ignore
   * @param translateService
   */
  constructor(private translateService:TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
  }

  /**
   * Variable that contains the name of the website.
   */
  title = 'planningPokerPP';
}
