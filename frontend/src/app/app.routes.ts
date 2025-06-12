import { Routes } from '@angular/router';
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { CreacionEncuestaComponent } from './components/creacion-encuesta/creacion-encuesta.component';
import { ResponderEncuestaComponent } from './components/responder.encuesta/responder-encuesta.component';
import { ResultadosEncuestaComponent } from './components/resultados-encuesta/resultados-encuesta.component'
import { ListaRespuestasComponent } from './components/lista-respuestas/lista-respuestas.component';
import { DetalleRespuestaComponent } from './components/detalle-respuesta/detalle-respuesta.component';
import { EncuestaCreadaComponent } from './components/encuesta-creada/encuesta-creada.component';
import {GestorEncuestasComponent} from './components/gestor-encuestas/gestor-encuestas.component'
export const routes: Routes = [
  {
      path: '',
      component: ComienzoComponent,
      title: 'Comenzar',
  },

 {
    path: 'crear-encuesta',
    component: CreacionEncuestaComponent,
    title: 'Crear Encuesta'
  },
   {
    path: 'gestionar-encuesta',
    component: GestorEncuestasComponent,
    title: 'Gestionar Encuesta'
  },

  {
    path: 'encuesta-creada',
    component: EncuestaCreadaComponent
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
    path: 'lista-respuestas/:codigo',
    component: ListaRespuestasComponent,
    title: 'Lista de Respuestas'
  },
  {
    path: 'detalle-respuesta/:codigo/:respuestaId',
    component: DetalleRespuestaComponent,
    title: 'Detalle de Respuesta'
  },
  {
    path: '**',
    redirectTo: '/crear-encuesta'
  }
];
