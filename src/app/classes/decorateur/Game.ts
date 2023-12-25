/**
 * Game interface for the Decorator design pattern
 */
export interface Game {

  /**
   * Setter for players
   * @param players List of players
   */
  setPlayers(players: { [key: number]: string }): void;

  /**
   * Setter for backlogData
   * @param BacklogData All the backlog
   */
  setBacklogData(BacklogData: { [key: string]: number }): void;

  /**
   * Function that prompts players to enter the standard value
   */
  chooseDefaultValue(): void;

  /**
   * Function that sets all values useful for resuming the game
   * @param defaultValue {string} Standard game value
   * @param actualLog {number} id of function to note
   */
  continueGame(defaultValue: string, actualLog: number): void;

  /**
   * Defines whether to setup the standard value
   * @return
   */
  setupDefaultValue(): boolean;

  /**
   * Setter for the standard value
   * @param value {string} value for the standard value
   */
  setDefaultValue(value: string): void;

  /**
   * Next step function
   */
  nextStage(): void;

  /**
   * Set function to note
   * @param nb id of function to note
   */
  setStage(nb: number): void;

  /**
   * Game function, during this phase the players, each in turn, give the score they would give to the current task
   * using the <b>Planing Poker</b> card.
   */
  lunchStage(): void;

  /**
   * Return to current number of courses
   */
  getActualStage(): number;

  /**
   * Returns the number of players
   */
  getPlayerNumber(): number;

  /**
   * Return a player's name
   * @param key {number} id of the player to be returned
   */
  getPlayer(key: number): string;

  /**
   * Returning the standard value
   */
  getDefaultValue(): string;

  /**
   * Return BacklogData
   */
  getBacklogData(): { [key: string]: number };

  /**
   * Function triggered when a player selects a card. This function marks the function in the Backlog
   * @param id {string} rating given by player
   */
  playerPushButton(id: string): void;

  /**
   * Return to player list
   */
  getPlayers(): { [key: number]: string };

  /**
   * Adding a note to a Backlog function
   * @param value {string} note to add
   * @param key {string} Function which is noted
   */
  addNote(value: string, key: string): void

  /**
   * Return to note list
   */
  getNotes(): { [key: string]: string };

  /**
   * Recover a note
   * @param key {string} Id of note to be returned
   */
  getNote(key: string): string;

  /**
   * Change the note of a function in the backlog
   * @param key {string} Id of the function
   * @param value {number} Function note
   */
  modifyBacklogData(key: string, value: number): void;

  /**
   * Should we replay the round
   */
  isRetry(): boolean;

  /**
   * Do we need to download a backup
   */
  isDownload(): boolean;

  /**
   * Create and download a backup JSON file
   */
  creatAndDownloadJSON() : { [p: string]: any };

  /**
   * Set the player who must play
   * @param n {number} Id of the player who is to play
   */
  setActualPlayerTurn(n : number): void;

  /**
   * Function that launches at the end, with a summary of each note and the ability to download the Backlog JSON
   */
  end() : void;

  /**
   * Retrieve a note from the backlog
   * @param key {string} Function to which the note belongs
   */
  getBacklogDataNote(key : string) : number
}
