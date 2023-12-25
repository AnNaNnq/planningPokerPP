import {connect} from "rxjs";
import transformJavaScript from "@angular-devkit/build-angular/src/tools/esbuild/javascript-transformer-worker";

/**
 * Class based on the Facade design pattern, which lets you easily add HTML elements to the page's DOM
 */
export class HtmlDisplay{

  /**
   * Variable that contains everything that will be added to the DOM in HTML format
   */
  public content = "";


  /**
   * Function that places a text in an HTML DOM element
   * @param label {HTMLElement} reference to an HTML element to which a text has been added
   * @param text {string} text which will be placed in an HTML component
   */
  showText(label : HTMLElement, text : string){
    label.innerText = text;
  }

  /**
   * Function that adds an HTML tag with its various parameters to the content variable.
   *
   * @example
   * //Example of use
   * const balise = HtmlBalise.getInstance()
   * let html = new HtmlDisplay()
   * html.addHtmlElement("input", "stage1", {["type"] = "text", ["placeholder"] = "Enter Task"}, false)
   * html.displayHTML(balise.title) // You should have an input_text tag in the DOM that displays "Enter Task".
   *
   *
   * @param type {string} type of HTML tag to be placed in the DOM
   * @param id {string} id of element to be added to DOM
   * @param additionalValue {{[string] : string}} list containing the add valuers of the add element type of [key : string] : string
   * @param closeBalise {boolean} defined if the added tag is a closing tag
   */
  addHtmlElement(type : string = "div", id? : string, additionalValue? : {[key : string] : string}, closeBalise : boolean = false){
    if(!closeBalise) {
      this.content += "<" + type + " ";

      if (id != null) this.content += "id='" + id + "' ";

      if (additionalValue != null) {
        Object.keys(additionalValue).forEach(key => {
          this.content += key + "='" + additionalValue[key] + "' "
        });
      }

      this.content += ">"
    }else{
      this.content += "</" + type + ">";
    }
  }

  /**
   * Function for adding a class to an HTML object by passing its ID
   * @param id {string} id of the element to which you want to add a class
   * @param classe {string} name of the class to be added
   */
  addClass(id: string, classe: string){
    const element = document.getElementById(id);
    if(element == null) return
    console.log("aa")
    element.classList.add(classe);
  }

  /**
   * Function to add a text to the content, not an HTML tag but a text to be displayed.
   * @param text {string} text to be added to content
   */
  addText(text : string){
    this.content += text;
  }

  /**
   * Function for adding content to an HTML object
   * @param element {HTMLElement} DOM element in which we'll add all the content
   */
  displayHTML(element : HTMLElement){
    element.innerHTML = this.content;
    this.content = ""
  }

  /**
   * Function that allows you to empty an HTML element by deleting everything that was added after it was generated.
   * @param element {HTMLElement} DOM element to be emptied
   */
  clearHTML(element : HTMLElement){
    element.innerHTML = "";
    this.content = "";
  }
}
