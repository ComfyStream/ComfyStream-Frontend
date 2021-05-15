import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common"; 
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { EventoTarjetaComponent } from "./components/evento-tarjeta/evento-tarjeta.component";
import { EventoComponent } from "./pages/evento/evento.component";
import { PagesComponent } from "./pages/pages.component";
import { LoginComponent } from "./auth/login/login.component";
import { MisEventosComponent } from "./pages/mis-eventos/mis-eventos.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { CuentaComponent } from "./pages/cuenta/cuenta.component";
import { MisAsistenciasComponent } from "./pages/mis-asistencias/mis-asistencias.component";
import { CrearEventoComponent } from "./pages/crear-evento/crear-evento.component";
import { ChatComponent } from "./pages/chat/chat.component";
import { MisChatsComponent } from "./pages/mis-chats/mis-chats.component";
import { ChatTarjetaComponent } from "./components/chat-tarjeta/chat-tarjeta.component";
import { MiPerfilComponent } from "./pages/mi-perfil/mi-perfil.component";
import { ContrasenaComponent } from "./pages/contrasena/contrasena.component";
import { DatosBancariosComponent } from "./pages/datos-bancarios/datos-bancarios.component";
import { RegistroComponent } from "./auth/registro/registro.component";
import { AsistirComponent } from "./pages/asistir/asistir.component";
import { NgxPayPalModule } from "ngx-paypal";
import { BuscadorComponent } from "./pages/buscador/buscador.component";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { PoliticaPrivacidadComponent } from "./pages/politica-privacidad/politica-privacidad.component";
import { TerminosUsoComponent } from "./pages/terminos-uso/terminos-uso.component";
import { SoporteComponent } from "./pages/soporte/soporte.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { EditarEventoComponent } from "./pages/editar-evento/editar-evento.component";
import { SerProfesionalComponent } from "./pages/ser-profesional/ser-profesional.component";
import { DetallesProfesionalComponent } from "./pages/detalles-profesional/detalles-profesional.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ValorarProfesionalComponent } from "./pages/valorar-profesional/valorar-profesional.component";
import { ConfirmarComponent } from "./auth/confirmar/confirmar.component";
import { MisValoracionesComponent } from "./pages/mis-valoraciones/mis-valoraciones.component";
import { AsistenciasAdminComponent } from "./pages/asistencias-admin/asistencias-admin.component";
import {NgxPaginationModule} from "ngx-pagination";
import { SuscripcionesComponent } from './pages/suscripciones/suscripciones.component';
import { SuscriptoresComponent } from './pages/suscriptores/suscriptores.component';



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
    MiPerfilComponent,
    ContrasenaComponent,
    DatosBancariosComponent,
    AsistirComponent,
    BuscadorComponent,
    MiPerfilComponent,
    RegistroComponent,
    AsistirComponent,
    PoliticaPrivacidadComponent,
    TerminosUsoComponent,
    SoporteComponent,
    FooterComponent,
    EditarEventoComponent,

    DetallesProfesionalComponent,
    ValorarProfesionalComponent,
    ConfirmarComponent,
    MisValoracionesComponent,

    SerProfesionalComponent,
    DetallesProfesionalComponent,
    AsistenciasAdminComponent,
    SuscripcionesComponent,
    SuscriptoresComponent

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
    AngularFireStorageModule,
    NgbModule,
    NgxPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
