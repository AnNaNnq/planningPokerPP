import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * Component that create a configurable button with some specific style, the only change possible
 * is the link, the color of the background and the text.
 */
@Component({
  selector: 'start-button',
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.scss']
})
export class StartButtonComponent implements OnInit{
  /**
   * Variable to change the color under a button when it's called in another component.
   */
  @Input() pushableBackground: string = '';

  /**
   * Variable to change the background color of a button when it's called in another component.
   */
  @Input() captionBackground: string = '';

  /**
   * Variable to change the text color of a button when it's called in another component.
   */
  @Input() captionColor: string = '';

  /**
   * Variable to change the text on a button when it's called in another component.
   */
  @Input() name: string = '';

  /**
   * Variable to change the link of a button when it's called in another component.
   */
  @Input() link: string = '';

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

  /**
   * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked. It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {

  }
}
