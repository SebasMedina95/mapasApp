import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; //Debemos importar así la librería de mapbox luego de haber hecho la instalación con npm install mapbox-gl --save
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapBoxToken ;
  }

  title = 'mapasApp';
}
