import {Component, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

/**
 * Class for choosing skins
 */
@Component({
  selector: 'shop-component',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink
  ],
  templateUrl: './shop-component.component.html',
  styleUrl: './shop-component.component.scss'
})
export class ShopComponentComponent implements OnInit{
  /**
   * @ignore
   */
  ngOnInit(): void {
    let elements = document.getElementsByClassName("skinbutton") as HTMLCollectionOf<HTMLDivElement>
    for(let i = 0; i < elements.length; i++){
      if(i.toString() == (localStorage.getItem("skinId") || "0")){
        elements[i].setAttribute("select", "true")
      }
      const img : string = elements[i].getAttribute("image") as string | 'erreur';
      elements[i].style.backgroundImage = "url(" + img + ")";
    }
  }

  /**
   * Selectioner un skin
   * @param e click element
   */
  selectSkin(e: any){
    localStorage.setItem("image", "url(" + e.target.getAttribute("image") + ")");
    localStorage.setItem("skinId", e.target.getAttribute("id"));
    this.changSelected();
  }

  /**
   * Changer l'affichage du skin selectioner
   */
  changSelected(){
    let elements = document.getElementsByClassName("skinbutton") as HTMLCollectionOf<HTMLDivElement>
    for(let i = 0; i < elements.length; i++){
      if(i.toString() == (localStorage.getItem("skinId") || 0)){
        elements[i].setAttribute("select", "true")
      }else{
        elements[i].setAttribute("select", "false")
      }
    }
  }
}
