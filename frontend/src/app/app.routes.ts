import { Routes } from '@angular/router';
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { CreacionEncuestaComponent } from './components/creacion-encuesta/creacion-encuesta.component';
import { ResponderEncuestaComponent } from './components/responder.encuesta/responder-encuesta.component';
import { ResultadosEncuestaComponent } from './components/resultados-encuesta/resultados-encuesta.component'

export const routes: Routes = [
{
    path: '',
    component: ComienzoComponent,
},
{
    path: 'creacion',
    component: CreacionEncuestaComponent
}, 
// {
//     path: '**',
//     redirectTo:''
// },

{
    path: '',
    redirectTo: '/crear-encuesta',
    pathMatch: 'full'
  },
  {
    path: 'crear-encuesta',
    component: CreacionEncuestaComponent,
    title: 'Crear Encuesta'
  },

  
  {
    path: 'responder/:codigo',
    component: ResponderEncuestaComponent,
    title: 'Responder Encuesta'
  },
  {
    path: 'resultados/:codigo',
    component: ResultadosEncuestaComponent,
    title: 'Resultados de Encuesta'
  },

 
  {
    path: '**',
    redirectTo: '/crear-encuesta'
  }
];
