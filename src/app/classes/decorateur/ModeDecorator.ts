import {Game} from "./Game";
import {HtmlDisplay} from "../facade/HtmlDisplay";
import {HtmlBalise} from "../singleton/htmlBalise";
import {TranslateService} from "@ngx-translate/core";


/**
 * Class that styles the game and its events according to the decorator design pattern
 * @implements Game
 */
export abstract class ModeDecorator implements Game {

  /**
   * Contains information about the current game
   * @protected
   */
  protected game: Game;

  /**
   * Variable containing the facade for adding HTML elements
   * @protected
   */
  protected html: HtmlDisplay;

  /**
   * ID of the current player
   */
  actualPlayerTurn: number = 1;

  /**
   * List of notes
   */
  notes: string[] = [];

  /**
   * Do I need to retry the turn
   */
  retry = false;

  /**
   * Do I need to download the JSON
   */
  downloadJson = false;


  /**
   * class constructor
   * @param game class constructor
   * @param translate
   */
  constructor(game: Game, public translate: TranslateService) {
    this.game = game;
    this.html = new HtmlDisplay();
  }

  /**
   * Setter for players
   * @param players List of players
   */
  setPlayers(players: { [key: number]: string }) {
    this.game.setPlayers(players);
  }

  /**
   * Setter for backlogData
   * @param BacklogData All the backlog
   */
  setBacklogData(BacklogData: { [p: string]: number }): void {
    this.game.setBacklogData(BacklogData);
  }

  /**
   * Function that prompts players to enter the standard value
   */
  chooseDefaultValue(): void {
    const balise = HtmlBalise.getInstance();

    this.html.showText(balise.task, this.translate.instant('Choose a standard value'));
    balise.inputValue.style.display = "block"
    this.html.displayHTML(balise.stValue)
  }

  /**
   * Defines whether to setup the standard value
   * @return
   */
  setupDefaultValue(): boolean {
    return this.game.setupDefaultValue();
  }

  /**
   * Setter for the standard value
   * @param value {string} value for the standard value
   */
  setDefaultValue(value: string): void {
    this.game.setDefaultValue(value);
    const balise = HtmlBalise.getInstance();
    this.html.clearHTML(balise.stValue);
    this.html.clearHTML(balise.endMessage);
    this.nextStage();
  }

  /**
   * Game function, during this phase the players, each in turn, give the score they would give to the current task
   * using the <b>Planing Poker</b> card.
   */
  lunchStage() {
    this.notes = []
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
    this.html.addText(this.translate.instant("Standard value is ") + "<label style='color: #10ABFFFF;'> " + this.getDefaultValue() + "</label>");
    this.html.addHtmlElement("label", undefined, undefined, true)
    this.html.displayHTML(balise.stValue)

    let value = 0;
    let backlogData = this.getBacklogData();
    Object.keys(backlogData).forEach(key => {
      value++;
      if (value == actualStage) {
        this.html.addHtmlElement("div");
        this.html.addText(this.translate.instant('DefineValue') + key);
        this.html.addHtmlElement("div", undefined, undefined, true);

        balise.playerButton.style.display = "flex"
      }
    });

    this.html.displayHTML(balise.task);
  }

  /**
   * Function that reveals the scores of each player during this phase
   */
  reavelNote() {
    const balise = HtmlBalise.getInstance();
    this.html.clearHTML(balise.stValue)
    this.html.clearHTML(balise.endMessage)
    this.html.clearHTML(balise.task)
    this.html.clearHTML(balise.gameModeMessage)
    this.html.clearHTML(balise.title)

    this.html.showText(balise.task, this.translate.instant('Reavel of Notation'));

    let evryboddySameMind = true;

    let nameQuestion = "";
    let nameCoffe = "";

    Object.keys(this.getNotes()).forEach(key => {
      this.html.addHtmlElement("div", undefined, {
        ["style"]:
        "border: 1.2px solid white; " +
        "min-width: 110px;" +
        "transition: 0.3s; " +
        "border-radius: 5px; " +
        "padding: 8px 15px 15px 15px;" +
        "margin-top: 30px;" +
        "color: white;" +
        "background-image: url(\"../../../assets/images/retrosoleil.jpg\");" +
        "background-size: 100%;" +
        "box-shadow: 0 0 2px #fff, 0 0 7px #fff, 0 0 10px #1beabd, 0 0 25px #10abff;"
      });
      this.html.addText("<div style=' padding: 5px 0;'>" + key + " </div> <div style='padding-top: 12px; text-align: center'>" + this.getNote(key) + "</div>");
      this.html.addHtmlElement("div", undefined, undefined, true);
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
    this.html.displayHTML(balise.stValue);

    for (let i = 0; i < this.notes.length; i++) for (let j = i; j < this.notes.length; j++) if (this.notes[i] != this.notes[j]) evryboddySameMind = false;

    if (evryboddySameMind) {
      this.sameMind(this.notes[0]);
    } else {
      this.notSameMind();
    }
  }

  /**
   * Fonction qui ce déclanche si un joueur à selectioner la carte <b><i>?</i></b>
   * @param playerName {string} nom du joueur qui a selectioner la carte <b><i>?</i></b>
   * @constructor
   */
  QuestionSelected(playerName: string) {
    const balise = HtmlBalise.getInstance();
    this.html.clearHTML(balise.stValue)
    this.html.clearHTML(balise.endMessage)
    this.html.clearHTML(balise.task)
    this.html.clearHTML(balise.gameModeMessage)

    this.html.addText(playerName + this.translate.instant('notUnderstand'))
    this.html.displayHTML(balise.stValue);

    this.html.addText(this.translate.instant('Questioning'))
    this.html.displayHTML(balise.task)

    this.retry = true;

    balise.validateButton.style.display = 'block';
    balise.validateButton.name = "Try again";
  }

  /**
   * Fonction qui ce déclanche si un joueur à selectioner la carte <b><i>Café</i></b>
   * @param playerName nom du joueur qui a selectioner la carte <b><i>Café</i></b>
   * @constructor
   */
  CoffeeSelected(playerName: string) {
    const balise = HtmlBalise.getInstance();
    this.html.clearHTML(balise.stValue)
    this.html.clearHTML(balise.endMessage)
    this.html.clearHTML(balise.task)
    this.html.clearHTML(balise.gameModeMessage)

    this.html.addText(playerName + this.translate.instant('tooComplicated'))
    this.html.displayHTML(balise.stValue);

    this.html.addText(this.translate.instant('Timeout'))
    this.html.displayHTML(balise.task)

    this.retry = false;
    this.downloadJson = true;

    balise.validateButton.style.display = 'block';
    balise.validateButton.name = this.translate.instant('Download');
  }

  /**
   * Next step function
   */
  nextStage() {
    this.game.nextStage();
    this.lunchStage();
  }

  /**
   * Return to current number of courses
   */
  getActualStage(): number {
    return this.game.getActualStage();
  }


  /**
   * Returns the number of players
   */
  getPlayerNumber(): number {
    return this.game.getPlayerNumber();
  }

  /**
   * Return a player's name
   * @param key {number} id of the player to be returned
   */
  getPlayer(key: number): string {
    return this.game.getPlayer(key);
  }

  /**
   * Returning the standard value
   */
  getDefaultValue(): string {
    return this.game.getDefaultValue();
  }

  /**
   * Return BacklogData
   */
  getBacklogData(): { [p: string]: number } {
    return this.game.getBacklogData();
  }

  /**
   * Function triggered when a player selects a card. This function marks the function in the Backlog
   * @param id {string} rating given by player
   */
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

  /**
   * Return to player list
   */
  getPlayers(): { [p: number]: string } {
    return this.game.getPlayers();
  }

  /**
   * Adding a note to a Backlog function
   * @param value {string} note to add
   * @param key {string} Function which is noted
   */
  addNote(value: string, key: string): void {
    this.game.addNote(value, key);
  }

  /**
   * Return to note list
   */
  getNotes(): { [key: string]: string } {
    return this.game.getNotes();
  }

  /**
   * Recover a note
   * @param key {string} Id of note to be returned
   */
  getNote(key: string): string {
    return this.game.getNote(key);
  }

  /**
   * If all the players have set the same score, we add the score to the function
   * @param note {string} note to add
   */
  sameMind(note: string) {
    this.retry = false;
    const balise = HtmlBalise.getInstance();

    this.html.addHtmlElement("label");
    this.html.addText(this.translate.instant('sameOpinion'));
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

  /**
   * If everyone disagrees, we do nothing.
   */
  notSameMind() {
    const balise = HtmlBalise.getInstance();

    this.html.addText(this.translate.instant('notAgree'))
    this.html.displayHTML(balise.endMessage);
  }

  /**
   * Change the note of a function in the backlog
   * @param key {string} Id of the function
   * @param value {number} Function note
   */
  modifyBacklogData(key: string, value: number): void {
    this.game.modifyBacklogData(key, value);
  }

  /**
   * Should we replay the round
   */
  isRetry(): boolean {
    return this.retry;
  }

  /**
   * Set the player who must play
   * @param n {number} Id of the player who is to play
   */
  setActualPlayerTurn(n: number): void {
    this.actualPlayerTurn = n;
  }

  /**
   * Function that launches at the end, with a summary of each note and the ability to download the Backlog JSON
   */
  end(): void {
    const balise = HtmlBalise.getInstance();

    this.html.clearHTML(balise.stValue)
    this.html.clearHTML(balise.endMessage)
    this.html.clearHTML(balise.gameModeMessage)

    this.html.showText(balise.task, this.translate.instant('Resume'));

    this.html.addHtmlElement("ul");

    Object.keys(this.getBacklogData()).forEach(key => {
      this.html.addHtmlElement("li");
      this.html.addText(key + " : " + this.getBacklogDataNote(key))
      this.html.addHtmlElement("li", undefined, undefined, true);
    })

    this.html.addHtmlElement("ul", "id", undefined, true);
    this.html.displayHTML(balise.stValue);

    let data = this.getBacklogData();
    const jsonOutput: { [key: string]: any } = {
      default: this.getDefaultValue(),
      Backlog: {}
    };

    Object.keys(data).forEach((key, index) => {
      const entry: { [key: string]: any } = {};

      entry[key] = data[key];

      jsonOutput['Backlog'][(index + 1).toString().padStart(2, '0')] = entry;
    });

    const filename = 'result.json';
    const json = JSON.stringify(jsonOutput, null, 2);
    const blob = new Blob([json], {type: 'application/json'});
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);

    balise.validateButton.style.display = 'none';
    balise.playerButton.style.display = 'none';
    balise.finishButton.style.display = 'block';
  }

  /**
   * Retrieve a note from the backlog
   * @param key {string} Function to which the note belongs
   */
  getBacklogDataNote(key: string): number {
    return this.game.getBacklogDataNote(key);
  }

  /**
   * Do we need to download a backup
   */
  isDownload(): boolean {
    return this.downloadJson;
  }

  /**
   * Create and download a backup JSON file
   */
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

  /**
   * Function that sets all values useful for resuming the game
   * @param defaultValue {string} Standard game value
   * @param actualLog {number} id of function to note
   */
  continueGame(defaultValue: string, actualLog: number): void {
    this.setStage(actualLog);
    this.game.setDefaultValue(defaultValue);
    this.lunchStage();
  }

  /**
   * Set function to note
   * @param nb id of function to note
   */
  setStage(nb: number): void {
    this.game.setStage(nb);
  }
}
