import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EventoTarjetaComponent } from './components/evento-tarjeta/evento-tarjeta.component';
import { EventoComponent } from './pages/evento/evento.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { MisEventosComponent } from './pages/mis-eventos/mis-eventos.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EventoTarjetaComponent,
    EventoComponent,
    PagesComponent,
    LoginComponent,
    AuthComponent,
    MisEventosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
