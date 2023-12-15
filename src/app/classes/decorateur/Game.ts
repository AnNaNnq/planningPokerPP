export interface Game {

  setPlayers(players: { [key: number]: string }): void;

  setBacklogData(BacklogData: { [key: string]: number }): void;

  chooseDefaultValue(): void;

  setupDefaultValue(): boolean;

  setDefaultValue(value: string): void;

  nextStage(): void;

  lunchStage(): void;

  getActualStage(): number;

  getPlayerNumber(): number;

  getPlayer(key: number): string;

  getDefaultValue(): string;

  getBacklogData(): { [key: string]: number };

  playerPushButton(id: string): void;

  getPlayers(): { [key: number]: string };

  addNote(value: string, key: string): void

  getNotes(): { [key: string]: string };

  getNote(key: string): string;

  modifyBacklogData(key: string, value: number): void;

  isRetry(): boolean;

  isDownload(): boolean;

  creatAndDownloadJSON() : void;

  setActualPlayerTurn(n : number): void;

  end() : void;

  getBacklogDataNote(key : string) : number
}
