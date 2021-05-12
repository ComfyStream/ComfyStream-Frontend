import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';


const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'invitacion/:idReferido', component: RegistroComponent },
    { path: 'confirmar/:urlConfirmacion', component: ConfirmarComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
