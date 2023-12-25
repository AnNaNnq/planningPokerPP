import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponentComponent } from './game-component.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {StartButtonComponent} from "../start-button/start-button.component";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {HtmlBalise} from "../../classes/singleton/htmlBalise";

describe('GameComponentComponent', () => {
  let component: GameComponentComponent;
  let fixture: ComponentFixture<GameComponentComponent>;
  let balise: HtmlBalise;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('html tag generation', () => {
    expect(balise).not.toBeNull();
  });
});

