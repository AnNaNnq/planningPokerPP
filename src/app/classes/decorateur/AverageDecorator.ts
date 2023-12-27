import {ModeDecorator} from "./ModeDecorator";
import {HtmlBalise} from "../singleton/htmlBalise";


/**
 * Class containing the specific features of the Average mode
 * @extends ModeDecorator
 */
export class AverageDecorator extends ModeDecorator {

  /**
   * List of notes used
   */
  notesList = [0, 1, 2, 3, 5, 8, 20, 40, 100];

  /**
   * Function that calculates the average of all scores if the players don't all agree with each other
   * and selects the card closest to the average
   */
  override notSameMind() {
    super.notSameMind();

    const balise = HtmlBalise.getInstance();

    let n = 0

    for (let i = 0; i < this.notes.length; i++) {
      n += parseInt(this.notes[i]);
      console.log("n", n)
    }

    n /= this.notes.length
    console.log("total", n)

    let value = 0;

    let distance = 1000;
    for (let i = this.notesList.length; i >= 0; i--) {
      if (distance > Math.abs(this.notesList[i] - n)) {
        distance = Math.abs(n - this.notesList[i]);
        value = this.notesList[i]
        console.log("distance", distance, "n", n, "value", value)
      }
    }

    let nb = 0;

    this.html.addText(this.translate.instant('useAverage'));
    Object.keys(this.getBacklogData()).forEach(key => {
      nb++;
      if (nb == this.getActualStage()) {
        this.modifyBacklogData(key, value)
        this.html.addText(value + "")
      }
    })


    this.html.displayHTML(balise.gameModeMessage);

    balise.validateButton.style.display = "block"
  }

  /**
   * Function that saves a save JSON to resume the game, adds the game mode to the JSON
   * @return {{ [p: string]: any }} JSON backup
   */
  override creatAndDownloadJSON(): { [p: string]: any } {
    let jsonOutput = super.creatAndDownloadJSON();

    const jsonWithMode = {
      mode: "moyenne",
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
