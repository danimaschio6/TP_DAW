import { Routes } from '@angular/router';
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { CreacionEncuestaComponent } from './components/creacion-encuesta/creacion-encuesta.component';
import { ResponderEncuestaComponent } from './components/responder-encuesta/responder-encuesta.component';

export const routes: Routes = [
{
    path: '',
    component: ComienzoComponent,
},
{
    path: 'creacion',
    component: CreacionEncuestaComponent,
}, 
{
    path: 'responder',
    component: ResponderEncuestaComponent,
}, 
{
    path: '**',
    redirectTo:''
}
];
