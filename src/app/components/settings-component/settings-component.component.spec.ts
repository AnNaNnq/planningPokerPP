import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartButtonComponent } from "../start-button/start-button.component";
import { SettingsComponentComponent } from './settings-component.component';
import {TranslateModule} from "@ngx-translate/core";
import {PlayerCardComponent} from "../player-card/player-card.component";
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";

describe('SettingsComponentComponent', () => {
  let component: SettingsComponentComponent;
  let fixture: ComponentFixture<SettingsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponentComponent, StartButtonComponent, PlayerCardComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule, RouterModule]
    });
    fixture = TestBed.createComponent(SettingsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
