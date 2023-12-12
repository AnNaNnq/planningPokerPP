import {Component, OnInit} from '@angular/core';
import {GameOptionServiceService} from "../../services/gameOptionService/game-option-service.service";
import {keyframes} from "@angular/animations";
import {count} from "rxjs";
import * as events from "events";
import {createObject} from "rxjs/internal/util/createObject";

@Component({
  selector: 'game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.scss']
})
export class GameComponentComponent implements  OnInit{

  //Contient les taches du backlogue et leurs poinds (initier à Zero)
  BacklogData: { [key : string]: number } = {};

  //Nom du mode
  mode: string = "";

  //Liste des joueurs
  Players: { [key: number]: string} = {}

  //Liste des joueurs avec la note qu'ils on attribuer
  PlayersNote: { [key : string]: string } = {};

  //La valeur étalon
  defaultValue : string = "";

  //Text principal (le titre quoi)
  textToShow = document.getElementById("textToShow") as HTMLLabelElement;


  actualFunctionInBacklog : number = 0;

  fonctionDuBouton : number = 0;

  actualPlayerTurn = 1;

  listValue = ["0.5", "1", "2", "3", "5", "10", "20", "40", "100", "?", "cafe"]

  constructor(private dataService : GameOptionServiceService) {}

  ngOnInit() {
    //Recuperation des données envoyées et les mettre dans les bonne variables
    this.dataService.data$.subscribe(data => {
      if(data != null) {
        Object.keys(data).forEach(key => {
          if (key.startsWith('Player')) {
            const playerNumber = parseInt(key.replace('Player', ''), 10);
            this.Players[playerNumber] = data[key];
          } else if (key.startsWith('Mode')) {
            this.mode = data[key];
          } else if (key.startsWith('Backlog')) {
            this.BacklogData[data[key]] = 1;
          }
        });
      }
      //S'il y a pas de données on enregistre celle-la
      else{
        this.Players[1] = "A";
        this.Players[2] = "B";
        this.mode = "classique";
        this.BacklogData["Boutton Start"] = 1;
        this.BacklogData["Boutton Quiter"] = 1;
      }
    });

    //Cacher les cartes
    const playerButtons = document.getElementById("PlayerButton") as HTMLDivElement;
    playerButtons.style.display = 'none';

    //Pour le mode strict
    if(this.mode == "strict"){
      this.chooseDefaultValue();
    }
  }

  //Ecrant de selection de la valeur étalon
  chooseDefaultValue(){
    this.actualFunctionInBacklog = 0;
    this.textToShow = document.getElementById("textToShow") as HTMLLabelElement
    //Text qui indique la consigne
    this.textToShow.innerHTML = "Choice of standard value :";

    const inputText = document.getElementById("input_text") as HTMLInputElement;
    //L'entré du text
    inputText.innerHTML = "<input id='stage1' type=\"text\" placeholder=\"Enter Task\">";
  }

  //Pas touche
  valideStage(){
    switch (this.fonctionDuBouton){
      case 0:{
        const valueElement = document.getElementById("stage1") as HTMLInputElement;
        if(valueElement != null) {
          let value = valueElement.value;
          console.log(value);
          if(value == "") break;
          this.defaultValue = value;
          this.nextStage();
        }else break;
        break;
      }
      case 1:{
        if(this.actualFunctionInBacklog < Object.keys(this.BacklogData).length){
          this.actualPlayerTurn = 1
          this.nextStage();
        }else{
         this.End();
        }
        break;
      }
      case 2:{
        this.actualPlayerTurn = 1
        this.LaunchStage();
        break;
      }
      default:{
        break;
      }
    }
  }

  //Pas touche
  private nextStage() {
    this.actualFunctionInBacklog++;
    this.LaunchStage();
  }
  private LaunchStage() {
    //On cache le boutons de validation si un joueur doit jouer
    if(this.actualPlayerTurn <= Object.keys(this.Players).length){
        const button = document.getElementById("validateButton") as HTMLButtonElement;
        button.style.display = 'none';
    }
    else {
      //Cacher les boutons des joueur si personne ne joue
      const playerButtons = document.getElementById("PlayerButton") as HTMLDivElement;
      playerButtons.style.display = 'none';
      this.reavelNote();
      return;
    }

    this.textToShow = document.getElementById("textToShow") as HTMLLabelElement

    //Affichage du nom du joueur qui joue
    this.textToShow.innerHTML = "Turn of " + this.Players[this.actualPlayerTurn] +

      //Affichage du nom de la valeur étlon
      "<br>Standard value is " + this.defaultValue;

    const inputText = document.getElementById("input_text") as HTMLDivElement;
    inputText.innerHTML = "";

    let value = 0;
    Object.keys(this.BacklogData).forEach(key => {
      value++;
      if(value == this.actualFunctionInBacklog){
        //Affichage du nom de la fonctionalité actuelle
        inputText.innerHTML = "<p> Define the value of " + key + "</p><br>";
        const playerButtons = document.getElementById("PlayerButton") as HTMLDivElement;
        playerButtons.style.display = 'block';
      }
    });
  }

  //Pas Touche
  selectButton(id:string){
    let value = 0;
    Object.keys(this.Players).forEach(key => {
      value++;
      if(value == this.actualPlayerTurn){
        this.PlayersNote[this.Players[value]] = id;
      }
    });
    console.log(this.PlayersNote);
    this.actualPlayerTurn++;
    this.LaunchStage();
  }

  reavelNote(){
    this.textToShow = document.getElementById("textToShow") as HTMLLabelElement
    //Titre de la page
    this.textToShow.innerHTML = "Reavel of Notation";

    let notes : string[] = [];
    let evryboddySameMind = true;

    const inputText = document.getElementById("input_text") as HTMLDivElement;

    let nameQuestion = "";
    let nameCoffe = "";

    //affichage de la liste #1
    inputText.innerHTML = "<ul>";

    Object.keys(this.PlayersNote).forEach(key => {
      //#2
      inputText.innerHTML += "<li>" + key + " : " + this.PlayersNote[key] + "</li>"
      notes.push(this.PlayersNote[key]);

      if(this.PlayersNote[key] == "?"){
        nameQuestion = key;
      }else if(this.PlayersNote[key] == "cafe"){
        nameCoffe = key;
      }

      if(notes.includes("?")){
        this.QuestionSelected(nameQuestion);
        return;
      }else if(notes.includes("cafe")){
        this.CoffeeSelected(nameCoffe);
        return;
      }
    });
    if(notes.includes("?")){
      return;
    }else if(notes.includes("cafe")){
      return;
    }
    //#3
    inputText.innerHTML += "</ul>"

    for(let i = 0; i < notes.length; i++) for(let j = i; j < notes.length; j++) if(notes[i] != notes[j]) evryboddySameMind = false;

    if(evryboddySameMind){
      //Affichage du text qui dit que tout le monde est d'accord
      inputText.innerHTML += "<br> Everyone is of the same opinion we can pass to the next function"
      const button = document.getElementById("validateButton") as HTMLButtonElement;

      let value = 0;

      Object.keys(this.BacklogData).forEach(key => {
        value++;
        if(value == this.actualFunctionInBacklog){
          this.BacklogData[key] = parseInt(notes[0]);
        }
      })

      this.fonctionDuBouton = 1;
      button.style.display = 'block';
      button.innerText = "Next";
    }
    else
    {
      //Affichage du text qui dit qu'il y a conflit
      inputText.innerHTML += "<br> You don't agree with each other. That's all right."
      let max = 0;
      let maxPlayer = "";

      let min = 1000;
      let minPlayer = "";
      Object.keys(this.PlayersNote).forEach(key => {
        if(parseInt(this.PlayersNote[key]) > max){
          max = parseInt(this.PlayersNote[key])
          maxPlayer = key;
        }
        if (parseInt(this.PlayersNote[key]) < min){
          min = parseInt(this.PlayersNote[key])
          minPlayer = key;
        }
      });
      //affichage du nom des personnes qui on la note la plus haute et la plus basses pour qu'ils s'expliquent
      inputText.innerHTML += "<br> <b>" + maxPlayer + "</b> has the highest rating they will explain his choice then <b>" +
        minPlayer + "</b> with the lowest score will be explained";

      //affichage du boutton
      this.fonctionDuBouton = 2;
      const button = document.getElementById("validateButton") as HTMLButtonElement;
      button.style.display = 'block';
      button.innerText = "Try again";
    }

  }

  QuestionSelected(playerName : string){
    this.textToShow = document.getElementById("textToShow") as HTMLLabelElement
    //Affichage de l'indiacation de la question
    this.textToShow.innerHTML = playerName + " n'a pas compris la fonctionalité, expliquez lui";

    const inputText = document.getElementById("input_text") as HTMLDivElement;
    inputText.innerHTML = "";
    this.fonctionDuBouton = 2;

    //Affichage du bouton
    const button = document.getElementById("validateButton") as HTMLButtonElement;
    button.style.display = 'block';
    button.innerText = "Try again";
  }

  CoffeeSelected(playerName : string){
    this.textToShow = document.getElementById("textToShow") as HTMLLabelElement
    //Affichage de l'indiacation du café
    this.textToShow.innerHTML = playerName + " dit que c'est trops compliquez et qu'il faut en parlé autour d'un bon café";

    const inputText = document.getElementById("input_text") as HTMLDivElement;
    inputText.innerHTML = "";
    this.fonctionDuBouton = 2;

    //Affichage du bouton
    const button = document.getElementById("validateButton") as HTMLButtonElement;
    button.style.display = 'block';
    button.innerText = "Try again";
  }


  End(){
    this.textToShow = document.getElementById("textToShow") as HTMLLabelElement
    //Affichage du titre
    this.textToShow.innerHTML = "Recapitulatif";
    const inputText = document.getElementById("input_text") as HTMLDivElement;

    //Affichage de la liste #1
    inputText.innerHTML = "<ul>";

    Object.keys(this.BacklogData).forEach(key => {
      //#2
      inputText.innerHTML += "<li>" + key + " : " + this.BacklogData[key] + "</li>"
    })
    //#3
    inputText.innerHTML += "</ul>";

    const button = document.getElementById("validateButton") as HTMLButtonElement;
    button.style.display = 'none';

    const finishButton = document.getElementById("finishButton");
    //Affichage du gros boutons de fin
    if(finishButton != null){
      finishButton.style.display = "block";
    }
  }


  protected readonly parseInt = parseInt;
}
