import {connect} from "rxjs";
import transformJavaScript from "@angular-devkit/build-angular/src/tools/esbuild/javascript-transformer-worker";

export class HtmlDisplay{

  content = "";

  showText(label : HTMLLabelElement, text : string){
    label.innerText = text;
  }

  addHtmlElement(type : string = "div", id : string = "", classes : string[] = [], additionalValue : {[key : string] : string} = {}, closeBalise : boolean = false){
    if(!closeBalise) {
      this.content += "<" + type + " ";

      if (id != "") this.content += "id='" + id + "' ";
      if (classes.length > 0) {
        this.content += "class='";
        for (let classe in classes) {
          this.content += classe + ", ";
        }
        this.content += "' "
      }

      if (Object.keys(additionalValue).length > 0) {
        Object.keys(additionalValue).forEach(key => {
          this.content += key + "='" + additionalValue[key] + "' "
        });
      }

      this.content += ">"
    }else{
      this.content += "</" + type + ">";
    }
  }

  addText(text : string){
    this.content += text;
  }

  displayHTML(element : HTMLElement){
    element.innerHTML = this.content;
    this.content = ""
  }

  clearHTML(element : HTMLElement){
    element.innerHTML = "";
    this.content = "";
  }

}
