import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages/pages.routing';



const routes: Routes = [

  { path: '', component: PagesComponent},
  { path: '**', pathMatch: 'full', redirectTo: ''},

];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
    AuthRoutingModule,
    PagesRoutingModule
    
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }


