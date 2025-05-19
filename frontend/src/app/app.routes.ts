import { Routes } from '@angular/router';
import { PruebaComponent } from './components/prueba/prueba.component';

export const routes: Routes = [{
    path: '', component: PruebaComponent,
}, 
{
    path: '**', redirectTo:''
}
];
