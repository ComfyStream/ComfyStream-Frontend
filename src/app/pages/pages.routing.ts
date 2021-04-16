import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { EventoComponent } from './evento/evento.component';
import { MisEventosComponent } from './mis-eventos/mis-eventos.component';
import { LandingComponent } from './landing/landing.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { MisAsistenciasComponent } from './mis-asistencias/mis-asistencias.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { ChatComponent } from './chat/chat.component';
import { MisChatsComponent } from './mis-chats/mis-chats.component';
import { MiPerfilComponent} from './mi-perfil/mi-perfil.component';



const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'evento/:id', component: EventoComponent},
            { path: 'mis-chats', component: MisChatsComponent},
            { path: 'chat/:id', component: ChatComponent},
            { path: 'mis-eventos', component: MisEventosComponent},
            { path: 'mis-asistencias', component: MisAsistenciasComponent},
            { path: 'home', component: HomeComponent},
            { path: 'landing', component: LandingComponent},
            { path: 'mi-cuenta', component: CuentaComponent},
            { path: 'crear-evento', component: CrearEventoComponent},
            { path: 'mi-perfil', component: MiPerfilComponent},
            { path: '**', pathMatch: 'full', redirectTo: ''},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}