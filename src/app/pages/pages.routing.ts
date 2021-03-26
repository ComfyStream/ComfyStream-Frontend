import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { EventoComponent } from './evento/evento.component';
import { MisEventosComponent } from './mis-eventos/mis-eventos.component';



const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'evento/:id', component: EventoComponent},
            { path: 'mis-eventos', component: MisEventosComponent},
            { path: 'home', component: HomeComponent},
            { path: '**', pathMatch: 'full', redirectTo: ''},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}