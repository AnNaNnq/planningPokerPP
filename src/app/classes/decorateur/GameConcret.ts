import {Game} from "./Game";

export class GameConcret implements Game{

  Players: { [key: number]: string} = {};
  PlayersNote: { [key : string]: string } = {};
  BacklogData: { [key : string]: number } = {};

  bSetupDefaultValue = true;

  defaultValue = "";

  actualFunctionInBacklog : number = 0;

  setPlayers(players: { [p: number]: string }): void {
    this.Players = players
    console.log(this.Players);
  }

  setBacklogData(BacklogData: { [key : string]: number }){
    this.BacklogData = BacklogData
  }

  chooseDefaultValue(): void {
  }

  setupDefaultValue(): boolean {
    return this.bSetupDefaultValue;
  }

  setDefaultValue(value: string): void {
    this.defaultValue = value
    this.bSetupDefaultValue = false;
  }

  nextStage(){
    this.actualFunctionInBacklog++;
  }

  getActualStage(): number {
    return this.actualFunctionInBacklog;
  }

  getPlayerNumber(): number {
    return Object.keys(this.Players).length;
  }

  getPlayer(key: number): string {
    return this.Players[key];
  }

  getDefaultValue(): string {
    return this.defaultValue;
  }

  getBacklogData(): { [p: string]: number } {
    return this.BacklogData;
  }

  playerPushButton(id: string): void {
  }

  getPlayers(): { [p: number]: string } {
    return this.Players;
  }

  addNote(value : string, key : string) : void {
    this.PlayersNote[key] = value;
  }

  getNotes() : { [key : string]: string }{
    return this.PlayersNote;
  }

  getNote(key : string) : string{
    return this.PlayersNote[key];
  }

  modifyBacklogData(key : string, value : number) : void{
    this.BacklogData[key] = value;
  }

  getBacklogDataNote(key : string) : number{
    return this.BacklogData[key];
  }

  isRetry(): boolean {
    return false;
  }

  setActualPlayerTurn(n: number): void {
  }

  end(): void {
  }

  lunchStage(): void {
  }

  isDownload(): boolean {
    return false;
  }

  creatAndDownloadJSON(): { [p: string]: any } {
    const test : { [p: string]: any } = {}
    return test;
  }

}
