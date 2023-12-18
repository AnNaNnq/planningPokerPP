import { Component } from '@angular/core';

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
   * Variable that contains the name of the website.
   */
  title = 'planningPokerPP';
}
