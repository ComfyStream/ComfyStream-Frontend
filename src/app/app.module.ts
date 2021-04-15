import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EventoTarjetaComponent } from './components/evento-tarjeta/evento-tarjeta.component';
import { EventoComponent } from './pages/evento/evento.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { MisEventosComponent } from './pages/mis-eventos/mis-eventos.component';
import { LandingComponent } from './pages/landing/landing.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { MisAsistenciasComponent } from './pages/mis-asistencias/mis-asistencias.component';
import { CrearEventoComponent } from './pages/crear-evento/crear-evento.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MisChatsComponent } from './pages/mis-chats/mis-chats.component';
import { ChatTarjetaComponent } from './components/chat-tarjeta/chat-tarjeta.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AsistirComponent } from './pages/asistir/asistir.component';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EventoTarjetaComponent,
    EventoComponent,
    PagesComponent,
    LoginComponent,
    MisEventosComponent,
    MisAsistenciasComponent,
    LandingComponent,
    CuentaComponent,
    CrearEventoComponent,
    ChatComponent,
    MisChatsComponent,
    ChatTarjetaComponent,
    RegistroComponent
    AsistirComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
