import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorPersonalizado {
  color : string;
  marcador? : mapboxgl.Marker;
  centro? : [number , number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      height : 100%;
      width  : 100%;
    }

    .list-group {
      position : fixed;
      top : 20px;
      right : 50px;
      z-index : 99;
    }

    li {
      cursor : pointer;
    }

    `
  ]
})
export class MarcadoresComponent implements OnInit, AfterViewInit {

  @ViewChild('aquiMapa') divMapa! : ElementRef;

  mapa! : mapboxgl.Map;
  zoomLevel : number = 15;
  center : [number , number] = [ -75.63770496004115 , 6.2791157046699455]; 

  //Arreglo de marcadores
  marcadoresArray : MarcadorPersonalizado[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom : this.zoomLevel
    });

    this.leerLocalStorage();

    // const markerHTML : HTMLElement = document.createElement('div');
    // markerHTML.innerHTML = "Hola Mundo";

    // const marcador = new mapboxgl.Marker({
    //   element : markerHTML
    // })

    // const marcador = new mapboxgl.Marker()
    //   .setLngLat( this.center )
    //   .addTo( this.mapa )

    /**Creemoslos dinámicamente */

  }

  ngOnInit(): void {
    //this.leerLocalStorage(); --No funcionaría D:
  }

  agregarMarcador(){
    //Color Aleatorio
    const colorMarcador = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable : true,
      color : colorMarcador
    })
      .setLngLat( this.center )
      .addTo ( this.mapa );

      this.marcadoresArray.push({
        color : colorMarcador,
        marcador : nuevoMarcador
      });

      //Llamamos el guardado.
      this.guardarMarcadorLocalStorage();

      /**Disparamos Listener, usamos el dragend que es cuando se deja de arrastrar */
      nuevoMarcador.on('dragend' , () => {
        this.guardarMarcadorLocalStorage();
      })
  }

  irMarcador( marker : mapboxgl.Marker ){
    console.log(marker);
    this.mapa.flyTo({
      center : marker.getLngLat()
    })
  }

  guardarMarcadorLocalStorage(){
    
    const lngLatArr : MarcadorPersonalizado[] = [];
    
    this.marcadoresArray.forEach( m => {
      const colorM = m.color;
      const {lng , lat} = m.marcador!.getLngLat();
      lngLatArr.push({
        color : colorM,
        centro : [ lng , lat ]
      });
    })

    //Grabamos
    localStorage.setItem('marcadores' , JSON.stringify(lngLatArr))

  }

  leerLocalStorage(){
    if(!localStorage.getItem('marcadores')){
      return;
    }

    const lngLatArr : MarcadorPersonalizado[] = JSON.parse(localStorage.getItem('marcadores')!);
    lngLatArr.forEach ( marc => {
      const newMarqui = new mapboxgl.Marker({
        color : marc.color,
        draggable : true
      })
        .setLngLat( marc.centro! )
        .addTo( this.mapa )

        this.marcadoresArray.push({
          marcador : newMarqui,
          color : marc.color
        });

        /**Disparamos Listener, usamos el dragend que es cuando se deja de arrastrar */
        newMarqui.on('dragend' , () => {
          this.guardarMarcadorLocalStorage();
        })

    });
    
  }

  borrarMarcador( indice : number ){
    this.marcadoresArray[indice].marcador?.remove();
    this.marcadoresArray.splice( indice , 1);
    this.guardarMarcadorLocalStorage();
  }

}
