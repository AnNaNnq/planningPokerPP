import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'start-button',
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.scss']
})
export class StartButtonComponent{
  /**
   * La variable qui permet de changer la couleur en dessous d'un bouton de type <start-button>
   * lorsqu'on l'appelle dans un autre composant.
   */
  @Input() pushableBackground: string = '';

  /**
   * La variable qui permet de changer la couleur de fond d'un bouton de type <start-button>
   * lorsqu'on l'appelle dans un autre composant.
   */
  @Input() captionBackground: string = '';

  /**
   * La variable qui permet de changer la couleur du texte d'un bouton de type <start-button>
   * lorsqu'on l'appelle dans un autre composant.
   */
  @Input() captionColor: string = '';

  /**
   * La variable qui permet de changer le nom d'un bouton de type <start-button>
   * lorsqu'on l'appelle dans un autre composant.
   */
  @Input() name: string = '';

  /**
   * La variable qui permet de changer le lien vers lequel redirige un bouton de type <start-button>
   * lorsqu'on l'appelle dans un autre composant.
   */
  @Input() link: string = '';

  /**
   * La variable qui permet d'envoyer un message lorsque le bouton est cliqué.
   */
  @Output() buttonClicked = new EventEmitter<void>();


  /**
   * La fonction qui envoie un message qui s'appelle buttonClicked.
   */
  onButtonClick() {
    this.buttonClicked.emit();
  }
}
