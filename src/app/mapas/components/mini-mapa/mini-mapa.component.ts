import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
      div {
        width : 100%;
        height : 150px;
        margin : 0px;
      }
    `
  ]
})
export class MiniMapaComponent implements OnInit, AfterViewInit {

  @Input() lngLat : [number , number] = [0,0];
  @ViewChild('mapa') divMapa! : ElementRef;
  
  constructor() { }


  ngAfterViewInit(): void {
    const mapita = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,  //Latitud - Longitud, al revés de GoogleMaps. 6.2791157046699455, -75.63770496004115
      zoom : 15,
      interactive : false
    });

    new mapboxgl.Marker()
      .setLngLat( this.lngLat )
      .addTo( mapita )
  }

  ngOnInit(): void {
    
  }

}
