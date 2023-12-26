import { Component } from '@angular/core';

@Component({
  selector: 'shop-component',
  standalone: true,
  imports: [],
  templateUrl: './shop-component.component.html',
  styleUrl: './shop-component.component.scss'
})
export class ShopComponentComponent {
  selectSkin(path: string){
    localStorage.setItem("image", "url(" + path + ")");
  }
}
