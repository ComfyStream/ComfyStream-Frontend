import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';
import { NoAuthGuard } from '../guards/no-auth.guard';

const routes: Routes = [

    { path: 'login',canActivate: [NoAuthGuard], component: LoginComponent },
    { path: 'registro',canActivate: [NoAuthGuard], component: RegistroComponent },
    { path: 'invitacion/:idReferido',canActivate: [NoAuthGuard], component: RegistroComponent },
    { path: 'confirmar/:urlConfirmacion',canActivate: [NoAuthGuard], component: ConfirmarComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
