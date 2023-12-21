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
    let value = 0;
    Object.keys(notesCount).forEach(key => {
      if(notesCount[parseInt(key)] > (this.getPlayerNumber()/2)){
        absMaj = true
        value = parseInt(key);
      }
    });

    const balise = HtmlBalise.getInstance();
    let nb = 0;
    if(absMaj){
      this.html.addText("The absolute majority has to win. The note : ")

      Object.keys(this.getBacklogData()).forEach(key => {
        nb++;
        if (nb == this.getActualStage()) {
          this.modifyBacklogData(key, value)
          this.html.addText(value + "")
        }
      })

      this.html.displayHTML(balise.gameModeMessage);
      this.retry = false;
    }else{
      let max = 0;
      let maxPlayer = "";

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
      this.html.addHtmlElement("b", undefined, undefined, true);
      this.html.addText(" has the highest rating they will explain his choice then ");
      this.html.addHtmlElement("b");
      this.html.addText(minPlayer);
      this.html.addHtmlElement("b", undefined, undefined, true);
      this.html.addText(" with the lowest score will be explained");

      this.html.displayHTML(balise.gameModeMessage);

      this.retry = true;
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
