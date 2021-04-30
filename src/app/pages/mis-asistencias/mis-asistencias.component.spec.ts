import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EventoComponent } from '../evento/evento.component';
import { Location } from '@angular/common';



import { MisAsistenciasComponent } from './mis-asistencias.component';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { Asistencia } from 'src/app/models/asistencia';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'misAsistencias', component: MisAsistenciasComponent },
    { path: 'evento/:id', component: EventoComponent }
];
describe('Mis asistencias', () => {
  let component: MisAsistenciasComponent;
  let fixture: ComponentFixture<MisAsistenciasComponent>;
  let servicio : AsistenciaService;
  let location: Location;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisAsistenciasComponent ],
      imports:[ HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MisAsistenciasComponent);
    component = fixture.componentInstance;
    servicio = TestBed.inject(AsistenciaService);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    router.initialNavigation()
    fixture.detectChanges();
  });

  it('Carga mis asistencias', () => {
    spyOn(servicio, "getMisAsistencias");
    component.ngOnInit();
    expect(servicio.getMisAsistencias).toHaveBeenCalled();
    
  });
  it('Obtiene asistencias', () => {
    const asistencias:Asistencia[] = [{_id: "123456", eventoId:"1123344", asistenteId:"31313131"},{_id: "654321", eventoId:"21212121", asistenteId:"33221133"}]
    spyOn(servicio, "getMisAsistencias").and.callFake(() => Promise.resolve(asistencias));
    component.ngOnInit();
    expect(servicio.getMisAsistencias).toHaveBeenCalled();
    fixture.whenStable().then(() => {
        expect(component.eventos.length).toBe(2)
    })
 
  });

  it('Ver evento', () => {
    spyOn(servicio, "getMisAsistencias");
    component.ngOnInit();
    expect(servicio.getMisAsistencias).toHaveBeenCalled();
    component.mostrarEvento("123456");
    fixture.whenStable().then(() => {
        expect(location.path()).toBe("/evento/123456")
    })
 
  });
})
