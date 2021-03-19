import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { LoginComponent } from './login.component';
import { Observable } from 'rxjs';

describe('LoginComponent', () => {
  let usuarioService:UsuarioService
  let fb:FormBuilder
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService)
    fb = TestBed.inject(FormBuilder)
    fixture.detectChanges();
  });

  describe('Formulario', () => {
    it('Formulario: Iniciado correctamente', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      
      expect(email.value).toEqual('')
      expect(password.value).toEqual('')
      expect(component.loginForm.valid).toBeFalsy()
    })
  
    it('Formulario: Validado', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      email.setValue('jescoevas@hotmail.com')
      password.setValue('1234')
      expect(email.value).toEqual('jescoevas@hotmail.com')
      expect(password.value).toEqual('1234')
      expect(component.loginForm.valid).toBeTruthy()
    })
  })

    xdescribe('Login', () => {
    it('Login: Datos enviados', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      
      email.setValue('jescoevas@hotmail.com')
      password.setValue('1234')
      spyOn(usuarioService, 'login')
      component.login()
      expect(usuarioService.login).toHaveBeenCalledWith(component.loginForm.value)
    })
    
    it('Login: Datos no enviados por password vacía', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      email.setValue('jescoevas@hotmail.com')
      password.setValue('')
      spyOn(usuarioService, 'login')
      component.login()
      expect(usuarioService.login).not.toHaveBeenCalled()
    })

    it('Login: Botón de submit funciona correctamente', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      email.setValue('jescoevas@hotmail.com')
      password.setValue('1234')
      spyOn(usuarioService, 'login')
      const button = fixture.debugElement.nativeElement.querySelector('#submit');
      button.click();
      expect(usuarioService.login).toHaveBeenCalled()
    })

    it('Login: Login exitoso', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      email.setValue('jescoevas@hotmail.com')
      password.setValue('1234')
      spyOn(usuarioService, 'login')
      component.login()
      expect(usuarioService.login).toHaveBeenCalled()
      fixture.whenStable().then(() => {
        expect(component.loginIncorrecto).toBeFalsy()
      })
    })

    it('Login: Email incorrecto', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      email.setValue('testing@gmail.com')
      password.setValue('testing')
      spyOn(usuarioService, 'login')
      component.login()
      expect(usuarioService.login).toHaveBeenCalled()
      fixture.whenStable().then(() => expect(component.loginIncorrecto).toBeTruthy())
    })

    
  })
});
