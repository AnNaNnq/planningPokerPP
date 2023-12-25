import {Component, EventEmitter, Output} from '@angular/core';

/**
 * Component that create an information button to explain the rules and the goal of this website.
 */
@Component({
  selector: 'information-button',
  templateUrl: './information-button.component.html',
  styleUrls: ['./information-button.component.scss']
})

export class InformationButtonComponent {
  /**
   * Variable who send a message when the button's clicked.
   */
  @Output() buttonClicked = new EventEmitter<void>();

  /**
   * Send a message with the variable buttonClicked.
   */
  onButtonClick() {
    this.buttonClicked.emit();
  }
}
