import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';
import { MisEventosComponent } from '../mis-eventos/mis-eventos.component';
import { EventoComponent } from '../evento/evento.component';
import { Location } from '@angular/common';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'misEventos', component: MisEventosComponent },
    { path: 'evento/:id', component: EventoComponent }
];
describe('Mis eventos', () => {
  let component: MisEventosComponent;
  let fixture: ComponentFixture<MisEventosComponent>;
  let servicio : EventoService;
  let location: Location;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisEventosComponent ],
      imports:[ HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MisEventosComponent);
    component = fixture.componentInstance;
    servicio = TestBed.inject(EventoService);
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

  it('Carga mis eventos', () => {
    expect(localStorage.setItem('profesional', 'true'));
    expect(localStorage.getItem('profesional')).toBe('true');
    spyOn(servicio, "getMisEventos");
    component.ngOnInit();
    expect(servicio.getMisEventos).toHaveBeenCalled();
    
  });
  it('Obtiene mis eventos', () => {
    expect(localStorage.setItem('profesional', 'true'));
    expect(localStorage.getItem('profesional')).toBe('true');
    const eventos:Evento[] = [{_id: "123456", titulo:"test1"},{_id: "654321", titulo:"test2"}]
    spyOn(servicio, "getMisEventos").and.callFake(() => Promise.resolve(eventos));
    component.ngOnInit();
    expect(servicio.getMisEventos).toHaveBeenCalled();
    fixture.whenStable().then(() => {
        expect(component.misEventos.length).toBe(2)
    })
 
  });

  it('Ver evento', () => {
    expect(localStorage.setItem('profesional', 'true'));
    expect(localStorage.getItem('profesional')).toBe('true');
    spyOn(servicio, "getMisEventos");
    component.ngOnInit();
    expect(servicio.getMisEventos).toHaveBeenCalled();
    component.mostrarEvento("123456");
    fixture.whenStable().then(() => {
        expect(location.path()).toBe("/evento/123456")
    })
 
  });
})
