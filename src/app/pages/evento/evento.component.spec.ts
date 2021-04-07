import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';
import { MisEventosComponent } from '../mis-eventos/mis-eventos.component';
import { EventoComponent } from '../evento/evento.component';
import { Location } from '@angular/common';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { LoginComponent } from 'src/app/auth/login/login.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login',  component: LoginComponent},
    { path: 'evento/:id', component: EventoComponent }
];
describe('Mis eventos', () => {
  let component: EventoComponent;
  let fixture: ComponentFixture<EventoComponent>;
  let servicio : EventoService;
  let asistenciaServicio : AsistenciaService;
  let location: Location;
  let router:Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoComponent ],
      imports:[ HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
    fixture = TestBed.createComponent(EventoComponent);
    component = fixture.componentInstance;
    servicio = TestBed.inject(EventoService);
    asistenciaServicio = TestBed.inject(AsistenciaService);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    router.initialNavigation()
    fixture.detectChanges();
    var store = {};


    spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });

    
  });

  it('Carga el evento', () => {
    spyOn(servicio, "getEventoPorID").withArgs("123456");
    component.ngOnInit();
    expect(servicio.getEventoPorID).toHaveBeenCalled();
    
  });
  it('Obtener el evento por id', () => {
    const evento:Evento = {_id: "123456", titulo:"test1"}
    spyOn(servicio, "getEventoPorID").withArgs("123456").and.callFake(()=>Promise.resolve(evento));
    component.ngOnInit();
    expect(servicio.getEventoPorID).toHaveBeenCalled();
    fixture.whenStable().then(()=>{
        expect(component.evento.titulo).toMatch("test1")
    })
 
  });

  // Para probar este test comentar el location.reload de asistir()
  xit('Asistir a un evento ', () => {
    const evento:Evento = {_id: "123456", titulo:"test1"}
    expect(localStorage.setItem('token', '123456'));
    spyOn(asistenciaServicio, "crearAsistencia");
    component.evento = evento;
    component.asistir();
    expect(asistenciaServicio.crearAsistencia).toHaveBeenCalled(); 
    
  });

  it('Asistir a un evento fallo por no tener token ', () => {
    expect(localStorage.removeItem('token'));
    spyOn(asistenciaServicio, "crearAsistencia");
    component.asistir();
    expect(asistenciaServicio.crearAsistencia).not.toHaveBeenCalled();
    fixture.whenStable().then(()=>{
        expect(location.path()).toBe("/login")
    })

    
  });
})

