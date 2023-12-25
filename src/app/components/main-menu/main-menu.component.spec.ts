import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuComponent } from './main-menu.component';
import {TranslateModule} from "@ngx-translate/core";
import {TitleComponent} from "../title/title.component";
import {InformationButtonComponent} from "../information-button/information-button.component";
import {StartButtonComponent} from "../start-button/start-button.component";
import {MatIconModule} from "@angular/material/icon";
import {BrowserModule} from "@angular/platform-browser";
import {ActivatedRoute, RouterModule} from "@angular/router";

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainMenuComponent, TitleComponent, InformationButtonComponent, StartButtonComponent],
      imports: [
        BrowserModule,
        MatIconModule,
        TranslateModule.forRoot(),
        RouterModule
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: "\lobby"
      }]
    });
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
