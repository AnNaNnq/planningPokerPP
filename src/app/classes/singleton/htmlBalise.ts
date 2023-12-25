/**
 * class singleton which contains the html tags to be modified
 */
export class HtmlBalise{
  /**
   * variable containing singleton class instance
   * @private
   */
  private static instance: HtmlBalise | null = null;


  /** @ignore */ stValue : HTMLElement
  /** @ignore */ task : HTMLElement
  /** @ignore */ endMessage : HTMLElement
  /** @ignore */ title : HTMLDivElement
  /** @ignore */ playerButton : HTMLDivElement
  /** @ignore */ validateButton : HTMLButtonElement
  /** @ignore */ finishButton : HTMLElement;
  /** @ignore */ gameModeMessage : HTMLDivElement;
  /** @ignore */ inputValue : HTMLInputElement;

  /** @ignore */
  private constructor() {
    this.stValue = document.getElementById("StandardValue") as HTMLElement
    this.task = document.getElementById("ActualTask") as HTMLElement
    this.endMessage = document.getElementById("endMessage") as HTMLElement
    this.title = document.getElementById("textToShow") as HTMLDivElement
    this.playerButton = document.getElementById("PlayerButton") as HTMLDivElement;
    this.validateButton = document.getElementById("validateButton") as HTMLButtonElement;
    this.finishButton = document.getElementById("finishButton") as HTMLElement;
    this.gameModeMessage = document.getElementById("gameModeMessage") as HTMLDivElement;
    this.inputValue = document.getElementById("stage1") as HTMLInputElement;
  }

  /**
   * Function to retrieve class instance
   * @return {HtmlBalise}
   */
  static getInstance(): HtmlBalise {
    if (!HtmlBalise.instance){
      HtmlBalise.instance = new HtmlBalise();
    }
    return HtmlBalise.instance;
  }

  /**
   * Function to empty the instance to create a new one
   */
  static clearInstance(): void{
    HtmlBalise.instance = null;
  }
}
