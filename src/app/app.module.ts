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
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AsistirComponent } from './pages/asistir/asistir.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { TerminosUsoComponent } from './pages/terminos-uso/terminos-uso.component';
import { SoporteComponent } from './pages/soporte/soporte.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EditarEventoComponent } from './pages/editar-evento/editar-evento.component';


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
    AsistirComponent,
    BuscadorComponent,
    MiPerfilComponent,
    RegistroComponent,
    AsistirComponent,
    PoliticaPrivacidadComponent,
    TerminosUsoComponent,
    SoporteComponent,
    FooterComponent,
    EditarEventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxPayPalModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBY4bMrPkqztG0JUnXvFLp4gbKpAL7lBqY",
      authDomain: "comfystream-s2.firebaseapp.com",
      projectId: "comfystream-s2",
      storageBucket: "comfystream-s2.appspot.com",
      messagingSenderId: "503131251870",
      appId: "1:503131251870:web:3f1170aba6356fff36c78f",
      measurementId: "G-5JFMBYSXEV"
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
