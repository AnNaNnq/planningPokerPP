import {Game} from "./Game";

/**
 * Class containing all game information
 * @implements Game
 */
export class GameConcret implements Game{

  /**
   * Function that sets all values useful for resuming the game
   * @param defaultValue {string} Standard game value
   * @param actualLog {number} id of function to note
   */
  continueGame(defaultValue: string, actualLog: number): void {
      throw new Error("Method not implemented.");
  }

  /**
   * List of players in the game
   */
  Players: { [key: number]: string} = {};
  /**
   * List of players in the game with the notes they have applied
   */
  PlayersNote: { [key : string]: string } = {};
  /**
   * Backlog list with associated rating
   */
  BacklogData: { [key : string]: number } = {};

  /**
   * Has the standard value been defined?
   */
  bSetupDefaultValue = true;

  /**
   * Standard value
   */
  defaultValue = "";

  /**
   * Which backlog function is being written down
   */
  actualFunctionInBacklog : number = 0;

  /**
   * Setter for players
   * @param players List of players
   */
  setPlayers(players: { [p: number]: string }): void {
    this.Players = players
    console.log(this.Players);
  }

  /**
   * Setter for backlogData
   * @param BacklogData All the backlog
   */
  setBacklogData(BacklogData: { [key : string]: number }){
    this.BacklogData = BacklogData
  }

  /**
   * @ignore
   */
  chooseDefaultValue(): void {
  }

  /**
   * Defines whether to setup the standard value
   * @return
   */
  setupDefaultValue(): boolean {
    return this.bSetupDefaultValue;
  }

  /**
   * Setter for the standard value
   * @param value {string} value for the standard value
   */
  setDefaultValue(value: string): void {
    this.defaultValue = value
    this.bSetupDefaultValue = false;
  }

  /**
   * Next step function
   */
  nextStage(){
    this.actualFunctionInBacklog++;
  }

  /**
   * Return to current number of courses
   */
  getActualStage(): number {
    return this.actualFunctionInBacklog;
  }

  /**
   * Returns the number of players
   */
  getPlayerNumber(): number {
    return Object.keys(this.Players).length;
  }

  /**
   * Return a player's name
   * @param key {number} id of the player to be returned
   */
  getPlayer(key: number): string {
    return this.Players[key];
  }

  /**
   * Returning the standard value
   */
  getDefaultValue(): string {
    return this.defaultValue;
  }

  /**
   * Return BacklogData
   */
  getBacklogData(): { [p: string]: number } {
    return this.BacklogData;
  }

  /**
   * Function triggered when a player selects a card. This function marks the function in the Backlog
   * @param id {string} rating given by player
   */
  playerPushButton(id: string): void {
  }

  /**
   * Return to player list
   */
  getPlayers(): { [p: number]: string } {
    return this.Players;
  }

  /**
   * Adding a note to a Backlog function
   * @param value {string} note to add
   * @param key {string} Function which is noted
   */
  addNote(value : string, key : string) : void {
    this.PlayersNote[key] = value;
  }

  /**
   * Return to note list
   */
  getNotes() : { [key : string]: string }{
    return this.PlayersNote;
  }

  /**
   * Recover a note
   * @param key {string} Id of note to be returned
   */
  getNote(key : string) : string{
    return this.PlayersNote[key];
  }

  /**
   * Change the note of a function in the backlog
   * @param key {string} Id of the function
   * @param value {number} Function note
   */
  modifyBacklogData(key : string, value : number) : void{
    this.BacklogData[key] = value;
  }

  /**
   * Retrieve a note from the backlog
   * @param key {string} Function to which the note belongs
   */
  getBacklogDataNote(key : string) : number{
    return this.BacklogData[key];
  }

  /**
   * Should we replay the round
   */
  isRetry(): boolean {
    return false;
  }

  /**
   * @ignore
   * @param n
   */
  setActualPlayerTurn(n: number): void {
  }

  /**
   * @ignore
   */
  end(): void {
  }

  /**
   * @ignore
   */
  lunchStage(): void {
  }

  /**
   * Do we need to download a backup
   */
  isDownload(): boolean {
    return false;
  }

  /**
   * Create and download a backup JSON file
   */
  creatAndDownloadJSON(): { [p: string]: any } {
    const test : { [p: string]: any } = {}
    return test;
  }

  /**
   * Set function to note
   * @param nb id of function to note
   */
  setStage(nb: number): void {
    this.actualFunctionInBacklog = nb;
  }

}


