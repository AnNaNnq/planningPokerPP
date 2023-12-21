import {ModeDecorator} from "./ModeDecorator";
import {HtmlBalise} from "../singleton/htmlBalise";

export class MajabsDecorator extends ModeDecorator{

  override notSameMind() {
    super.notSameMind();

    let absMaj = false;

    let notesCount: { [key: number]: number } = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      5: 0,
      8: 0,
      20: 0,
      40: 0,
      100: 0,
    };

    Object.keys(this.getNotes()).forEach(key => {
      notesCount[parseInt(this.getNote(key))] += 1;
    });

    Object.keys(notesCount).forEach(key => {
      if(notesCount[parseInt(key)] > (this.getPlayerNumber()/2)){
        absMaj = true
      }
    });

    const balise = HtmlBalise.getInstance();

    if(absMaj){

    }

    balise.validateButton.style.display = 'block';
    balise.validateButton.name = "Try again";
  }

  override creatAndDownloadJSON(): { [p: string]: any } {
    let jsonOutput = super.creatAndDownloadJSON();

    const jsonWithMode = {
      mode: "majabs",
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
