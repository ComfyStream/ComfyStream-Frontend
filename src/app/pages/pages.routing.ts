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
import { ContrasenaComponent} from './contrasena/contrasena.component';
import { DatosBancariosComponent} from './datos-bancarios/datos-bancarios.component';
import { AsistirComponent } from './asistir/asistir.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { TerminosUsoComponent } from './terminos-uso/terminos-uso.component';
import { SoporteComponent } from './soporte/soporte.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { SerProfesionalComponent } from './ser-profesional/ser-profesional.component';
import { DetallesProfesionalComponent } from './detalles-profesional/detalles-profesional.component';
import { ValorarProfesionalComponent } from './valorar-profesional/valorar-profesional.component';
import { MisValoracionesComponent } from './mis-valoraciones/mis-valoraciones.component';
import { AsistenciasAdminComponent } from './asistencias-admin/asistencias-admin.component';

//Guards
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { ProfesionalGuard } from '../guards/profesional.guard';
import { SuscriptoresComponent } from './suscriptores/suscriptores.component';
import { SuscripcionesComponent } from './suscripciones/suscripciones.component';

const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'evento/:id', component: EventoComponent},
            { path: 'mis-chats',canActivate: [AuthGuard], component: MisChatsComponent},
            { path: 'chat/:id', canActivate: [AuthGuard], component: ChatComponent},
            { path: 'mis-eventos',canActivate: [ProfesionalGuard], component: MisEventosComponent},
            { path: 'mis-asistencias',canActivate: [AuthGuard], component: MisAsistenciasComponent},
            { path: 'home', component: HomeComponent},
            { path: 'landing', component: LandingComponent},
            { path: 'editar-evento/:id',canActivate: [ProfesionalGuard], component: EditarEventoComponent},
            { path: 'mi-cuenta',canActivate: [AuthGuard], component: CuentaComponent},
            { path: 'crear-evento',canActivate: [ProfesionalGuard], component: CrearEventoComponent},
            { path: 'mi-perfil',canActivate: [AuthGuard], component: MiPerfilComponent},
            { path: 'contrasena',canActivate: [AuthGuard], component: ContrasenaComponent},
            { path: 'datos-bancarios',canActivate: [ProfesionalGuard], component: DatosBancariosComponent},
            { path: 'asistir/:id',canActivate: [AuthGuard], component: AsistirComponent},
            { path: 'policy', component: PoliticaPrivacidadComponent},
            { path: 'ToS', component: TerminosUsoComponent},
            { path: 'support', component: SoporteComponent},
            { path: 'detalles-profesional/:id', component: DetallesProfesionalComponent},
            { path: 'buscador', component: BuscadorComponent},
            { path: 'valorar/:id',canActivate: [AuthGuard], component: ValorarProfesionalComponent},
            { path: 'mis-valoraciones',canActivate: [AuthGuard], component: MisValoracionesComponent},
            { path: 'ser-profesional/:id',canActivate: [AuthGuard], component: SerProfesionalComponent},
            { path: 'asistencias', canActivate: [AdminGuard], component: AsistenciasAdminComponent},
            { path: 'suscriptores',canActivate: [ProfesionalGuard], component: SuscriptoresComponent},
            { path: 'suscripciones',canActivate: [AuthGuard], component: SuscripcionesComponent},
            { path: '**', pathMatch: 'full', redirectTo: ''},
        ]
    },
];


@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}