import {ModeDecorator} from "./ModeDecorator";
import {HtmlBalise} from "../singleton/htmlBalise";

export class AverageDecorator extends ModeDecorator{
  override notSameMind() {
    super.notSameMind();

    const balise = HtmlBalise.getInstance();

    this.html.addText("We can use the average of all your notation for the final notation");
    this.html.displayHTML(balise.gameModeMessage);

    let n = 0

    for(let i = 0; i < this.notes.length; i++){
      n += parseInt(this.notes[i]);
    }

    n /= this.notes.length

    let value = 0;

    Object.keys(this.getBacklogData()).forEach(key => {
      value++;
      if (value == this.getActualStage()) {
        this.modifyBacklogData(key, n)
      }
    })

    balise.validateButton.style.display = "block"
  }
}
