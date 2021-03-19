import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
<<<<<<< HEAD
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventComponent } from './pages/event/event.component';
=======
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
>>>>>>> 4c041c7035584f05349ba0a6a528f72cfdadfb92

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
<<<<<<< HEAD
    EventCardComponent,
    EventComponent
=======
    PagesComponent,
    LoginComponent,
    AuthComponent
>>>>>>> 4c041c7035584f05349ba0a6a528f72cfdadfb92
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
