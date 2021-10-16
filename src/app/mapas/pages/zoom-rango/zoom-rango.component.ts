import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; //Debemos importar así la librería de mapbox luego de haber hecho la instalación con npm install mapbox-gl --save
import { environment } from '../../../../environments/environment';
                                       //y luego de haber de instalar npm i --save-dev @types/mapbox-gl para tener la dependencia.

@Component({
  selector: 'app-zoom-rango',
  templateUrl: './zoom-rango.component.html',
  styles: [
    `
    /* #aquiMapa {
      height : 100%;
      width  : 100%;
    } */

    .mapa-container {
      height : 100%;
      width  : 100%;
    }

    .row {
      background-color : white;
      border-radius    : 5px;
      position         : fixed;
      bottom           : 50px;
      left             : 50px;
      padding          : 10px;
      z-index          : 999;
      width            : 400px;
    }

    `
  ]
})
export class ZoomRangoComponent implements /*OnInit,*/ AfterViewInit, OnDestroy {

  /**Para tomar un elemento HTML y usarlo como una propiedad apoyandonos de una referencia local */
  @ViewChild('aquiMapa') divMapa! : ElementRef;

  // Instanciamos el mapa para hacer una referencia
  mapa! : mapboxgl.Map;
  zoomLevel : number = 10;
  center : [number , number] = [ -75.63770496004115 , 6.2791157046699455];  //Latitud - Longitud, al revés de GoogleMaps. 6.2791157046699455, -75.63770496004115

  constructor() { 

  }

  /**Para evitar los duplicados, entonces luego de cada evento lo destruimos */
  ngOnDestroy(): void {
    this.mapa.off('zoom' , () => {});
    this.mapa.off('zoomend' , () => {});
    this.mapa.off('move' , () => {});
  }

  /**Después de que cargue todo poder obtener el elemento */
  ngAfterViewInit(): void {
    console.log('AfterViewInit' , this.divMapa);
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom : this.zoomLevel
    });

    /**Implementación de un Listener */
    this.mapa.on('zoom', (evento) => {
      // console.log(zoom);
      //console.log(evento);
      const zoomActual = this.mapa.getZoom();
      //console.warn(zoomActual);
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (evento) => {
      if(this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('zoom', (evento) => {
      if(this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
    });

    //Movimienot del mapa
    this.mapa.on('move', (evento) => {
      //console.log(evento);
      const t = evento.target;
      const { lng , lat } = t.getCenter();
      this.center = [ lng , lat ]
    })

  }

  // ngOnInit(): void {

  //   this.mapa = new mapboxgl.Map({
  //     container: 'aquiMapa',
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: [ -75.63770496004115 , 6.2791157046699455],  //Latitud - Longitud, al revés de GoogleMaps. 6.2791157046699455, -75.63770496004115
  //     zoom : 15
  //   });

  // }


  zoomOut(){
    console.log('Zoom Out');
    this.mapa.zoomOut();
    console.log('En el ZoomOut' , this.divMapa);
    //this.zoomLevel = this.mapa.getZoom();
  }

  zoomIn(){
    console.log('Zoom In');
    this.mapa.zoomIn();
    console.log('En el ZoomIn' , this.divMapa);
    //this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio( val : string  ){
    console.log(val);
    this.mapa.zoomTo( Number(val) )
  }

}
