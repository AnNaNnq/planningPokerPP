import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponentComponent } from './game-component.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {StartButtonComponent} from "../start-button/start-button.component";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {HtmlBalise} from "../../classes/singleton/htmlBalise";
import {HtmlDisplay} from "../../classes/facade/HtmlDisplay";
import {Game} from "../../classes/decorateur/Game";
import {StrictDecorator} from "../../classes/decorateur/StrictDecorator";
import {GameConcret} from "../../classes/decorateur/GameConcret";

describe('GameComponentComponent', () => {
  let component: GameComponentComponent;
  let fixture: ComponentFixture<GameComponentComponent>;
  let balise: HtmlBalise;
  let game: Game;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponentComponent, StartButtonComponent],
      imports: [MatSidenavModule, BrowserAnimationsModule, MatIconModule, RouterModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: "\game"
      }]
    });
    fixture = TestBed.createComponent(GameComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    balise = HtmlBalise.getInstance();
    game = new GameConcret();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('html tag generation', () => {
    expect(balise).not.toBeNull();
    expect(balise.playerButton).not.toBeNull();
    expect(balise.task).not.toBeNull();
    expect(balise.gameModeMessage).not.toBeNull();
    expect(balise.stValue).not.toBeNull();
    expect(balise.validateButton).not.toBeNull();
    expect(balise.inputValue).not.toBeNull();
    expect(balise.title).not.toBeNull();
    expect(balise.endMessage).not.toBeNull();
  });

  it('html generator', () => {
    const html = new HtmlDisplay();
    html.addText('aaa');
    expect(html.content).toBe('aaa');
    html.displayHTML(balise.task);
    expect(html.content).toBe("");
    html.addHtmlElement("li");
    expect(html.content).toBe("<li >")
    html.addHtmlElement("li", undefined, undefined, true)
    expect(html.content).toBe("<li ></li>")
  });

  it('game test', () => {
    game = new StrictDecorator(game);
    game.setStage(5);
    expect(game.getActualStage()).toEqual(5);

    game.setPlayers({1: 'a', 2 : 'b'});
    expect(game.getPlayers()).toEqual({1: 'a', 2 : 'b'});
    expect(game.getPlayer(1)).toEqual('a');

    game.setDefaultValue('default');
    expect(game.getDefaultValue()).toEqual('default');

    game.addNote('1', 'a');
    expect(game.getNote('a')).toEqual('1');
    expect(game.getNotes()).toEqual({'a': '1'});

    game.setBacklogData({'button': 5});
    expect(game.getBacklogData()).toEqual({'button': 5});
    expect(game.getBacklogDataNote('button')).toEqual(5);
  });
});
