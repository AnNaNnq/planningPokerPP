import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartButtonComponent} from "./components/start-button/start-button.component";
import {SettingsComponentComponent} from "./components/settings-component/settings-component.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: StartButtonComponent},
  {path: 'lobby', component: SettingsComponentComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
