export class HtmlBalise{
  private static instance: HtmlBalise | null = null;

  over : HTMLElement
  under : HTMLElement
  title : HTMLLabelElement
  playerButton : HTMLDivElement
  validateButton : HTMLButtonElement
  finishButton : HTMLElement;
  gameModeMessage : HTMLDivElement;

  private constructor() {
    this.over = document.getElementById("overPlayerButton") as HTMLElement
    this.under = document.getElementById("underPlayerButton") as HTMLElement
    this.title = document.getElementById("textToShow") as HTMLLabelElement
    this.playerButton = document.getElementById("PlayerButton") as HTMLDivElement;
    this.validateButton = document.getElementById("validateButton") as HTMLButtonElement;
    this.finishButton = document.getElementById("finishButton") as HTMLElement;
    this.gameModeMessage = document.getElementById("gameModeMessage") as HTMLDivElement;
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
