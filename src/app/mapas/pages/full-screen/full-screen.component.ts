import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; //Debemos importar así la librería de mapbox luego de haber hecho la instalación con npm install mapbox-gl --save
import { environment } from '../../../../environments/environment';
                                       //y luego de haber de instalar npm i --save-dev @types/mapbox-gl para tener la dependencia.


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #aquiMapa {
      height : 100%;
      width  : 100%;
    }

    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
      container: 'aquiMapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -75.63770496004115 , 6.2791157046699455],  //Latitud - Longitud, al revés de GoogleMaps. 6.2791157046699455, -75.63770496004115
      zoom : 15
    });

  }

}
