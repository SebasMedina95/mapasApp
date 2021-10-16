import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { ZoomRangoComponent } from './pages/zoom-rango/zoom-rango.component';

const routes: Routes = [

  {
    path : '',
    children: [
      { path : 'fullscreen' , component: FullScreenComponent },
      { path : 'marcadores' , component: MarcadoresComponent },
      { path : 'propiedades' , component: PropiedadesComponent },
      { path : 'zoomrango' , component: ZoomRangoComponent },
      { path : '**' , redirectTo: 'fullscreen' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
