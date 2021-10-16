import { Component, OnInit } from '@angular/core';

interface MenuItem {
  ruta : string;
  nombreRuta : string;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
    li {
      cursor : pointer;
    }
    `
  ]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menuItems : MenuItem[] = [
    {
      ruta : '/mapas/fullscreen',
      nombreRuta : 'FullScreen.'
    },
    {
      ruta : '/mapas/marcadores',
      nombreRuta : 'Marcadores.'
    },
    {
      ruta : '/mapas/propiedades',
      nombreRuta : 'Propiedades.'
    },
    {
      ruta : '/mapas/zoomrango',
      nombreRuta : 'Zoom Range.'
    }
  ]

}
