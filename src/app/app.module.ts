import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartButtonComponent } from './components/start-button/start-button.component';
import { InformationButtonComponent } from './components/information-button/information-button.component';
import { SettingsComponentComponent } from './components/settings-component/settings-component.component';

@NgModule({
  declarations: [
    AppComponent,
    StartButtonComponent,
    InformationButtonComponent,
    SettingsComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
