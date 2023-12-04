import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartButtonComponent } from './components/start-button/start-button.component';
import { InformationButtonComponent } from './components/information-button/information-button.component';

@NgModule({
  declarations: [
    AppComponent,
    StartButtonComponent,
    InformationButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
