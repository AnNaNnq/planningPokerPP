import {ModeDecorator} from "./ModeDecorator";
import {HtmlBalise} from "../singleton/htmlBalise";

/**
 * Class containing the specific features of the strict mode
 * @extends ModeDecorator
 */
export class StrictDecorator extends ModeDecorator {

  /**
   * Function which, if all players fail to select the same note, asks the two extremes to provide their
   * justification, and recomment the round
   */
  override notSameMind() {
    super.notSameMind();
    const balise = HtmlBalise.getInstance();

    let max = 0;
    let maxPlayer = "";

    let min = 1000;
    let minPlayer = "";

    Object.keys(this.getNotes()).forEach(key => {
      if (parseInt(this.getNote(key)) > max) {
        max = parseInt(this.getNote(key));
        maxPlayer = key;
      }
      if (parseInt(this.getNote(key)) < min) {
        min = parseInt(this.getNote(key));
        minPlayer = key;
      }
    });

    this.html.addHtmlElement("b");
    this.html.addText(maxPlayer);
    this.html.addHtmlElement("b", undefined, undefined, true);
    this.html.addText(this.translate.instant('highestNote'));
    this.html.addHtmlElement("b");
    this.html.addText(minPlayer);
    this.html.addHtmlElement("b", undefined, undefined, true);
    this.html.addText(this.translate.instant('lowestNote'));

    this.html.displayHTML(balise.gameModeMessage);

    this.retry = true;

    balise.validateButton.style.display = 'block';
    balise.validateButton.name = this.translate.instant('Try again');
  }

  /**
   * Function that saves a save JSON to resume the game, adds the game mode to the JSON
   * @return {{ [p: string]: any }} JSON backup
   */
  override creatAndDownloadJSON(): { [p: string]: any } {
    let jsonOutput = super.creatAndDownloadJSON();

    const jsonWithMode = {
      mode: "strict",
      ...jsonOutput
    };

    const filename = 'save.json';
    const json = JSON.stringify(jsonWithMode, null, 2);
    const blob = new Blob([json], {type: 'application/json'});
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);

    return jsonWithMode
  }
}
