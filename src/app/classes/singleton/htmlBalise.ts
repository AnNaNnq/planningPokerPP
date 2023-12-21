export class HtmlBalise{
  private static instance: HtmlBalise | null = null;

  stValue : HTMLElement
  task : HTMLElement
  endMessage : HTMLElement
  title : HTMLDivElement
  playerButton : HTMLDivElement
  validateButton : HTMLButtonElement
  finishButton : HTMLElement;
  gameModeMessage : HTMLDivElement;
  inputValue : HTMLInputElement;

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

  static getInstance(): HtmlBalise {
    if (!HtmlBalise.instance){
      HtmlBalise.instance = new HtmlBalise();
    }
    return HtmlBalise.instance;
  }

  static clearInstance(): void{
    HtmlBalise.instance = null;
  }
}
