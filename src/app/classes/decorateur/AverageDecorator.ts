import {ModeDecorator} from "./ModeDecorator";
import {HtmlBalise} from "../singleton/htmlBalise";

export class AverageDecorator extends ModeDecorator{

  notesList = [0, 1, 2, 3, 5, 8, 20, 40, 100];

  override notSameMind() {
    super.notSameMind();

    const balise = HtmlBalise.getInstance();

    let n = 0

    for(let i = 0; i < this.notes.length; i++){
      n += parseInt(this.notes[i]);
      console.log("n", n)
    }

    n /= this.notes.length
    console.log("total", n)

    let value = 0;

    let distance = 1000;
    for(let i = this.notesList.length; i >= 0; i--){
      if (distance > Math.abs(this.notesList[i] - n)){
        distance =  Math.abs(n - this.notesList[i]);
        value = this.notesList[i]
        console.log("distance",  distance, "n", n, "value", value)
      }
    }

    let nb =0;

    this.html.addText("We can use the average of all your notation for the final notation : ");
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

  override creatAndDownloadJSON(): { [p: string]: any } {
    let jsonOutput = super.creatAndDownloadJSON();

    const jsonWithMode = {
      mode: "moyenne",
      ...jsonOutput
    };

    const filename = 'output.json';
    const json = JSON.stringify(jsonWithMode, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);

    return jsonWithMode
  }
}
