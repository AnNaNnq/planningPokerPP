import {Component, Input} from '@angular/core';

/**
 * Component that create a card for the player and their name, to have a better display
 * in the <settings-component>.
 */
@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})

export class PlayerCardComponent {
  /**
   * Value of the current player.
   */
  @Input() i: number = 0;
}
