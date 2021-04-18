import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioService } from '../../services/usuario.service';
import { ChatService } from '../../services/chat.service';
import { Usuario } from '../../models/usuario';
import { Chat } from '../../models/chat';
import { Mensaje } from '../../models/mensaje';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login',  component: LoginComponent},
  { path: 'chat/:id', component: ChatComponent }
];

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let fb:FormBuilder
  let usuarioService:UsuarioService
  let chatService:ChatService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    usuarioService = TestBed.inject(UsuarioService)
    chatService = TestBed.inject(ChatService)
    fixture.detectChanges();
  });

  it('Init', () => {
    const usuario:Usuario = {_id:"123342"}
    const chats:Chat[] = [{_id:"11232"}, {_id:"1124323"}]
    const mensajes:Mensaje[] = [{_id:"183217"},{_id:"173267"}]
    spyOn(usuarioService, "getUsuario").and.callFake(() => Promise.resolve(usuario))
    spyOn(chatService, "getMensajesDelChat").withArgs("12345").and.callFake(() => Promise.resolve(mensajes))
    spyOn(chatService, "getMisChats").and.callFake(() => Promise.resolve(chats))
    component.ngOnInit()
    fixture.whenStable().then(() => {
      expect(component.miUsuario).toBe(usuario)
      expect(component.mensajes.length).toBe(2)
      expect(component.misChats.length).toBe(2)
    })
  });

  it("Mensaje vacio", () => {
    component.ngOnInit()
    fixture.whenStable().then(() => {
      let cuerpo = component.crearMensajeForm.controls['cuerpo']
      expect(cuerpo.value).toEqual("")
      expect(component.crearMensajeForm.valid).toBeFalsy()
    })
  })

  it("Enviar mensaje", () => {
    spyOn(chatService, "enviarMensaje")
    component.ngOnInit()
    fixture.whenStable().then(() => {
      let cuerpo = component.crearMensajeForm.controls['cuerpo']
      cuerpo.setValue("Mensaje de prueba")
      expect(component.crearMensajeForm.valid).toBeTruthy()
      component.enviarMensaje()
      expect(chatService.enviarMensaje).toHaveBeenCalled()
    })
  })

});