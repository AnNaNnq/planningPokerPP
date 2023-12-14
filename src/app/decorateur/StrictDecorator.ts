import {ModeDecorator} from "./ModeDecorator";
import {HtmlBalise} from "../singleton/htmlBalise";

export class StrictDecorator extends ModeDecorator{

  override notSameMind() {
    super.notSameMind();
    const balise = HtmlBalise.getInstance();

    let max = 0;
    let maxPlayer = ";"

    let min = 1000;
    let minPlayer = "";

    Object.keys(this.getNotes()).forEach(key => {
      if(parseInt(this.getNote(key)) > max){
        max = parseInt(this.getNote(key));
        maxPlayer = key;
      }
      if(parseInt(this.getNote(key)) < min){
        min = parseInt(this.getNote(key));
        minPlayer = key;
      }
    });

    this.html.addHtmlElement("b");
    this.html.addText(maxPlayer);
    this.html.addHtmlElement("b", undefined, undefined, undefined, true);
    this.html.addText(" has the highest rating they will explain his choice then ");
    this.html.addHtmlElement("b");
    this.html.addText(minPlayer);
    this.html.addHtmlElement("b", undefined, undefined, undefined, true);
    this.html.addText(" with the lowest score will be explained");

    this.html.displayHTML(balise.gameModeMessage);

    this.retry = true;

    balise.validateButton.style.display = 'block';
    balise.validateButton.innerText = "Try again";
  }

}
