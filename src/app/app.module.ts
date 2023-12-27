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
import { GameComponentComponent } from './components/game-component/game-component.component';
import { TitleComponent } from './components/title/title.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import {NgIf} from "@angular/common";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

/**
 * @ignore
 * @param http
 * @constructor
 */
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    StartButtonComponent,
    InformationButtonComponent,
    MainMenuComponent,
    SettingsComponentComponent,
    GameComponentComponent,
    TitleComponent,
    PlayerCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    NoopAnimationsModule,
    NgIf,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }
    ),
    MatInputModule,
    MatSelectModule
  ],
  providers:
    [HttpClient],
  exports: [
    StartButtonComponent
  ],
  bootstrap:
    [AppComponent]
})

export class AppModule {
}
