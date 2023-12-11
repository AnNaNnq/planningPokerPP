import {Component, Input} from '@angular/core';

@Component({
  selector: 'start-button',
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.scss']
})
export class StartButtonComponent {
  @Input() pushableBackground: string = '';
  @Input() captionBackground: string = '';
  @Input() captionColor: string = '';
  @Input() name: string = '';
  @Input() link: string = '';
}
