import {connect} from "rxjs";
import transformJavaScript from "@angular-devkit/build-angular/src/tools/esbuild/javascript-transformer-worker";

export class HtmlDisplay{

  content = "";

  showText(label : any, text : string){
    label.innerText = text;
  }

  addHtmlElement(type : string = "div", id : string = "", additionalValue : {[key : string] : string} = {}, closeBalise : boolean = false){
    if(!closeBalise) {
      this.content += "<" + type + " ";

      if (id != "") this.content += "id='" + id + "' ";

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

  addClass(id: string, classe: string){
    const element = document.getElementById(id);
    if(element == null) return
    console.log("aa")
    element.classList.add(classe);
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
