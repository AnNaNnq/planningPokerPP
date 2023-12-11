import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StartButtonComponent} from './components/start-button/start-button.component';
import {InformationButtonComponent} from './components/information-button/information-button.component';

import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {SettingsComponentComponent} from './components/settings-component/settings-component.component';


@NgModule({
  declarations: [
    AppComponent,
    StartButtonComponent,
    InformationButtonComponent,
    MainMenuComponent,
    SettingsComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    NoopAnimationsModule
  ],
  providers:
    [],
  bootstrap:
    [AppComponent]
})

export class AppModule {
}
