import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';

import { CrearEventoComponent } from './crear-evento.component';

describe('CrearEventoComponent', () => {
  let component: CrearEventoComponent;
  let fixture: ComponentFixture<CrearEventoComponent>;
  let eventoService:EventoService
  let fb:FormBuilder

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEventoComponent ],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();    
    
    fixture = TestBed.createComponent(CrearEventoComponent);
    component = fixture.componentInstance;
    eventoService = TestBed.inject(EventoService);
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();

  });

  it('Formulario: Iniciado correctamente', () => {
    let titulo = component.crearEventoForm.controls['titulo']
    let descripcion = component.crearEventoForm.controls['descripcion']
    let categoria = component.crearEventoForm.controls['categoria']
    let subcategoria = component.crearEventoForm.controls['subcategoria']
    let esPersonal = component.crearEventoForm.controls['esPersonal']
    let fecha = component.crearEventoForm.controls['fecha']
    let precio = component.crearEventoForm.controls['precio']
    let duracion = component.crearEventoForm.controls['duracion']
    let img = component.crearEventoForm.controls['img']
    
    
    expect(titulo.value).toEqual('')
    expect(descripcion.value).toEqual('')
    expect(categoria.value).toEqual('')
    expect(subcategoria.value).toEqual('')
    expect(esPersonal.value).toEqual(true)
    expect(fecha.value).toEqual('')
    expect(precio.value).toEqual('')
    expect(duracion.value).toEqual('')
    expect(img.value).toEqual(null)



    expect(component.crearEventoForm.valid).toBeFalsy()
  })

  it('Formulario: Datos validos', () => {
    let file = new File(["foo"], "foo.png", {
      type:"image/png"
  }); 
    let titulo = component.crearEventoForm.controls['titulo']
    let descripcion = component.crearEventoForm.controls['descripcion']
    let categoria = component.crearEventoForm.controls['categoria']
    let subcategoria = component.crearEventoForm.controls['subcategoria']
    let esPersonal = component.crearEventoForm.controls['esPersonal']
    let fecha = component.crearEventoForm.controls['fecha']
    let precio = component.crearEventoForm.controls['precio']
    let duracion = component.crearEventoForm.controls['duracion']
    let img = component.crearEventoForm.controls['img']
    titulo.setValue('titulo prueba')
    descripcion.setValue('descripcion prueba')
    categoria.setValue('categoria prueba')
    subcategoria.setValue('')
    esPersonal.setValue(true)
    fecha.setValue('2021-04-10T20:00:00.000')
    precio.setValue('300')
    duracion.setValue('30')
    img.setValue(file)

    
    expect(titulo.value).toEqual('titulo prueba')
    expect(descripcion.value).toEqual('descripcion prueba')
    expect(categoria.value).toEqual('categoria prueba')
    expect(subcategoria.value).toEqual('')
    expect(esPersonal.value).toEqual(true)
    expect(fecha.value).toEqual('2021-04-10T20:00:00.000')
    expect(precio.value).toEqual('300')
    expect(duracion.value).toEqual('30')
    expect(img.value).toEqual(file)

    expect(component.crearEventoForm.valid).toBeTruthy()
  })

  it('Formulario: Datos incorrectos por precio negativo', () => {
    let file = new File(["foo"], "foo.png", {
      type:"image/png"
  }); 
    let titulo = component.crearEventoForm.controls['titulo']
    let descripcion = component.crearEventoForm.controls['descripcion']
    let categoria = component.crearEventoForm.controls['categoria']
    let subcategoria = component.crearEventoForm.controls['subcategoria']
    let esPersonal = component.crearEventoForm.controls['esPersonal']
    let fecha = component.crearEventoForm.controls['fecha']
    let precio = component.crearEventoForm.controls['precio']
    let duracion = component.crearEventoForm.controls['duracion']
    let img = component.crearEventoForm.controls['img']
    titulo.setValue('titulo prueba')
    descripcion.setValue('descripcion prueba')
    categoria.setValue('categoria prueba')
    subcategoria.setValue('')
    esPersonal.setValue(true)
    fecha.setValue('2021-04-10T20:00:00.000')
    precio.setValue('-300')
    duracion.setValue('30')
    img.setValue(file)

    
    expect(titulo.value).toEqual('titulo prueba')
    expect(descripcion.value).toEqual('descripcion prueba')
    expect(categoria.value).toEqual('categoria prueba')
    expect(subcategoria.value).toEqual('')
    expect(esPersonal.value).toEqual(true)
    expect(fecha.value).toEqual('2021-04-10T20:00:00.000')
    expect(precio.value).toEqual('-300')
    expect(duracion.value).toEqual('30')
    expect(img.value).toEqual(file)
    
    expect(component.crearEventoForm.valid).toBeFalsy()

    spyOn(eventoService,"crearEvento");
    component.crearEvento()
    expect(eventoService.crearEvento).not.toHaveBeenCalled()
  })

  it('Formulario: Datos validos', () => {
    let file = new File(["foo"], "foo.png", {
      type:"image/png"
  }); 
    let titulo = component.crearEventoForm.controls['titulo']
    let descripcion = component.crearEventoForm.controls['descripcion']
    let categoria = component.crearEventoForm.controls['categoria']
    let subcategoria = component.crearEventoForm.controls['subcategoria']
    let esPersonal = component.crearEventoForm.controls['esPersonal']
    let fecha = component.crearEventoForm.controls['fecha']
    let precio = component.crearEventoForm.controls['precio']
    let duracion = component.crearEventoForm.controls['duracion']
    let img = component.crearEventoForm.controls['img']
    titulo.setValue('titulo prueba')
    descripcion.setValue('descripcion prueba')
    categoria.setValue('categoria prueba')
    subcategoria.setValue('')
    esPersonal.setValue(true)
    fecha.setValue('2021-04-10T20:00:00.000')
    precio.setValue('300')
    duracion.setValue('30')
    img.setValue(file)

    
    expect(titulo.value).toEqual('titulo prueba')
    expect(descripcion.value).toEqual('descripcion prueba')
    expect(categoria.value).toEqual('categoria prueba')
    expect(subcategoria.value).toEqual('')
    expect(esPersonal.value).toEqual(true)
    expect(fecha.value).toEqual('2021-04-10T20:00:00.000')
    expect(precio.value).toEqual('300')
    expect(duracion.value).toEqual('30')
    expect(img.value).toEqual(file)

    expect(component.crearEventoForm.valid).toBeTruthy()
    const evento :Evento={_id:"123456", titulo:"titulo de prueba"}
    spyOn(eventoService,"crearEvento").and.callFake(()=> Promise.resolve(evento));
    component.crearEvento()
    expect(eventoService.crearEvento).toHaveBeenCalled()
    



  })
});
