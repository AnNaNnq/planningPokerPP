import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponentComponent} from "./components/settings-component/settings-component.component";
import {MainMenuComponent} from "./components/main-menu/main-menu.component";
import {GameComponentComponent} from "./components/game-component/game-component.component";
import {ShopComponentComponent} from "./components/shop-component/shop-component.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: MainMenuComponent},
  {path: 'lobby', component: SettingsComponentComponent},
  {path: 'game', component: GameComponentComponent},
  {path: 'shop', component: ShopComponentComponent}
]

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
