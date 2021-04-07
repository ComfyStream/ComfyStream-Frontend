import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';
import { EventoComponent } from '../evento/evento.component';
import { Location } from '@angular/common';



import { HomeComponent } from './home.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'evento/:id', component: EventoComponent }
];
describe('Pagina de inicio', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let servicio : EventoService;
  let location: Location;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[ HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    servicio = TestBed.inject(EventoService);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    router.initialNavigation()
    fixture.detectChanges();
  });

  it('Carga eventos', () => {
    spyOn(servicio, "getEventos");
    component.ngOnInit();
    expect(servicio.getEventos).toHaveBeenCalled();
    
  });

  it('Obtiene eventos', () => {
    const eventos:Evento[] = [{_id: "123456", titulo:"test1"},{_id: "654321", titulo:"test2"}]
    spyOn(servicio, "getEventos").and.callFake(()=>Promise.resolve(eventos));
    component.ngOnInit();
    expect(servicio.getEventos).toHaveBeenCalled();
    fixture.whenStable().then(()=>{
        expect(component.eventos.length).toBe(2)
    })
 
  });

  it('Ver evento', () => {
    spyOn(servicio, "getEventos");
    component.ngOnInit();
    expect(servicio.getEventos).toHaveBeenCalled();
    component.mostrarEvento("123456");
    fixture.whenStable().then(()=>{
        expect(location.path()).toBe("/evento/123456")
    })
 
  });
})
