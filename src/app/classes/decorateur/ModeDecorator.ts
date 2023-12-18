import {Game} from "./Game";
import {HtmlDisplay} from "../facade/HtmlDisplay";
import {HtmlBalise} from "../singleton/htmlBalise";

export abstract class ModeDecorator implements Game {

  protected game: Game;
  protected html: HtmlDisplay;

  actualPlayerTurn: number = 1;

  notes: string[] = [];

  retry = false;
  downloadJson = false;

  constructor(game: Game) {
    this.game = game;
    this.html = new HtmlDisplay();
  }

  setPlayers(players: { [key: number]: string }) {
    this.game.setPlayers(players);
  }

  setBacklogData(BacklogData: { [p: string]: number }): void {
    this.game.setBacklogData(BacklogData);
  }

  chooseDefaultValue(): void {
    console.log(this.getBacklogData())
    const balise = HtmlBalise.getInstance();
    this.html.showText(balise.task, "Choice of standard value :")
    balise.inputValue.style.display = "block"
    console.log(this.html.content)
    this.html.displayHTML(balise.stValue)
  }

  setupDefaultValue(): boolean {
    return this.game.setupDefaultValue();
  }

  setDefaultValue(value: string): void {
    this.game.setDefaultValue(value);
    const balise = HtmlBalise.getInstance();
    this.html.clearHTML(balise.stValue);
    this.html.clearHTML(balise.endMessage);
    this.nextStage();
  }

  lunchStage() {
    const balise = HtmlBalise.getInstance();
    balise.inputValue.style.display = "none"
    this.retry = false;
    this.downloadJson = false;

    this.html.clearHTML(balise.stValue);
    this.html.clearHTML(balise.endMessage);
    this.html.clearHTML(balise.task);
    this.html.clearHTML(balise.gameModeMessage);

    let actualStage = this.getActualStage();
    console.log(actualStage);
    if (this.actualPlayerTurn <= this.getPlayerNumber()) {
      balise.validateButton.style.display = 'none';
    } else {
      balise.playerButton.style.display = 'none';
      this.reavelNote();
      return;
    }

    this.html.showText(balise.title, this.getPlayer(this.actualPlayerTurn));

    this.html.addHtmlElement("label");
    this.html.addText("Standard value is " + this.getDefaultValue());
    this.html.addHtmlElement("label", undefined, undefined, true)
    this.html.displayHTML(balise.stValue)

    let value = 0;
    let backlogData = this.getBacklogData();
    Object.keys(backlogData).forEach(key => {
      value++;
      if (value == actualStage) {
        this.html.addHtmlElement("div");
        this.html.addText("Define the value of " + key);
        this.html.addHtmlElement("div", undefined, undefined, true);

        balise.playerButton.style.display = "flex"
      }
    });

    this.html.displayHTML(balise.task);
  }

  reavelNote() {
    const balise = HtmlBalise.getInstance();
    this.html.clearHTML(balise.stValue)
    this.html.clearHTML(balise.endMessage)
    this.html.clearHTML(balise.task)
    this.html.clearHTML(balise.gameModeMessage)
    this.html.clearHTML(balise.title)

    this.html.showText(balise.task, "Reavel of Notation");

    let evryboddySameMind = true;

    let nameQuestion = "";
    let nameCoffe = "";

    this.html.addHtmlElement("ul");

    Object.keys(this.getNotes()).forEach(key => {
      this.html.addHtmlElement("li");
      this.html.addText(key + " : " + this.getNote(key));
      this.html.addHtmlElement("li", undefined, undefined, true);
      this.notes.push(this.getNote(key));

      if (this.getNote(key) == "?") {
        nameQuestion = key;
      } else if (this.getNote(key) == "cafe") {
        nameCoffe = key;
      }

      if (this.notes.includes("?")) {
        this.QuestionSelected(nameQuestion);
        return;
      } else if (this.notes.includes("cafe")) {
        this.CoffeeSelected(nameCoffe);
        return;
      }
    });
    if (this.notes.includes("?")) {
      return;
    } else if (this.notes.includes("cafe")) {
      return;
    }
    this.html.addHtmlElement("ul", undefined, undefined, true);
    this.html.displayHTML(balise.stValue);

    for (let i = 0; i < this.notes.length; i++) for (let j = i; j < this.notes.length; j++) if (this.notes[i] != this.notes[j]) evryboddySameMind = false;

    if (evryboddySameMind) {
      this.sameMind(this.notes[0]);
    } else {
      this.notSameMind();
    }
  }

  QuestionSelected(playerName: string) {
    const balise = HtmlBalise.getInstance();
    this.html.clearHTML(balise.stValue)
    this.html.clearHTML(balise.endMessage)
    this.html.clearHTML(balise.task)
    this.html.clearHTML(balise.gameModeMessage)

    this.html.addText(playerName + " didn't understand the function, explain it to him")
    this.html.displayHTML(balise.title);

    this.retry = true;

    balise.validateButton.style.display = 'block';
    balise.validateButton.name = "Try again";
  }

  CoffeeSelected(playerName: string) {
    const balise = HtmlBalise.getInstance();
    this.html.clearHTML(balise.stValue)
    this.html.clearHTML(balise.endMessage)
    this.html.clearHTML(balise.task)
    this.html.clearHTML(balise.gameModeMessage)

    this.html.addText(playerName + " says it's too complicated and that we should talk about it over a good cup of coffee.")
    this.html.displayHTML(balise.title);

    this.retry = false;
    this.downloadJson = true;

    balise.validateButton.style.display = 'block';
    balise.validateButton.name = "Download the JSON of your session to start again later";
  }

  nextStage() {
    this.game.nextStage();
    this.lunchStage();
  }

  getActualStage(): number {
    return this.game.getActualStage();
  }

  getPlayerNumber(): number {
    return this.game.getPlayerNumber();
  }

  getPlayer(key: number): string {
    return this.game.getPlayer(key);
  }

  getDefaultValue(): string {
    return this.game.getDefaultValue();
  }

  getBacklogData(): { [p: string]: number } {
    return this.game.getBacklogData();
  }

  playerPushButton(id: string): void {
    let value = 0;
    Object.keys(this.getPlayers()).forEach(key => {
      value++;
      if (value == this.actualPlayerTurn) {
        this.addNote(id, this.getPlayer(value));
      }
    });
    this.actualPlayerTurn++;
    this.lunchStage();
  }

  getPlayers(): { [p: number]: string } {
    return this.game.getPlayers();
  }

  addNote(value: string, key: string): void {
    this.game.addNote(value, key);
  }

  getNotes(): { [key: string]: string } {
    return this.game.getNotes();
  }

  getNote(key: string): string {
    return this.game.getNote(key);
  }

  sameMind(note: string) {
    this.retry = false;
    const balise = HtmlBalise.getInstance();

    this.html.addHtmlElement("label");
    this.html.addText("Everyone is of the same opinion we can pass to the next function");
    this.html.addHtmlElement("label", undefined, undefined, true);
    this.html.displayHTML(balise.endMessage);

    let value = 0;

    Object.keys(this.getBacklogData()).forEach(key => {
      value++;
      if (value == this.getActualStage()) {
        this.modifyBacklogData(key, parseInt(note))
      }
    })

    balise.validateButton.style.display = 'block';
    balise.validateButton.name = "block";
  }

  notSameMind() {
    const balise = HtmlBalise.getInstance();

    this.html.addText("You don't agree with each other. That's all right.")
    this.html.displayHTML(balise.endMessage);
  }

  modifyBacklogData(key: string, value: number): void {
    this.game.modifyBacklogData(key, value);
  }

  isRetry(): boolean {
    return this.retry;
  }

  setActualPlayerTurn(n: number): void {
    this.actualPlayerTurn = n;
  }

  end(): void {
    const balise = HtmlBalise.getInstance();

    this.html.clearHTML(balise.stValue)
    this.html.clearHTML(balise.endMessage)

    this.html.showText(balise.title, "Summary");

    this.html.addHtmlElement("ul");

    Object.keys(this.getBacklogData()).forEach(key => {
      this.html.addHtmlElement("li");
      this.html.addText(key + " : " + this.getBacklogDataNote(key))
      this.html.addHtmlElement("li", undefined, undefined, true);
    })

    this.html.addHtmlElement("ul", "id", undefined, true);
    this.html.displayHTML(balise.stValue);

    balise.validateButton.style.display = 'none';
    balise.playerButton.style.display = 'none';
    balise.finishButton.style.display = 'block';
  }

  getBacklogDataNote(key: string): number {
    return this.game.getBacklogDataNote(key);
  }

  isDownload(): boolean {
    return this.downloadJson;
  }

  creatAndDownloadJSON(): { [p: string]: any } {
    let data = this.getBacklogData();
    let players = this.getPlayers();

    const jsonOutput: { [key: string]: any } = {
      default: this.getDefaultValue(),
      Backlog: {},
      Players: {}
    };

    Object.keys(data).forEach((key, index) => {
      const entry: { [key: string]: any } = {};

      entry[key] = data[key];
      entry['work'] = this.getActualStage() > index + 1;

      jsonOutput['Backlog'][(index + 1).toString().padStart(2, '0')] = entry;
    });

    Object.keys(players).forEach((key, index) => {
      jsonOutput['Players'][(index + 1).toString().padStart(2, '0')] = players[parseInt(key)];
    });

    return jsonOutput;
  }
}
