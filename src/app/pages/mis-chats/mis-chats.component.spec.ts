import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { MisChatsComponent } from './mis-chats.component';
import { Routes, Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { ChatService } from '../../services/chat.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Chat  } from 'src/app/models/chat';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'mis-chats', component: MisChatsComponent },
  { path: 'chat/:id', component: ChatComponent }
];

describe('Mis chats', () => {
  let component: MisChatsComponent;
  let fixture: ComponentFixture<MisChatsComponent>;
  let servicio : ChatService;
  let location: Location;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisChatsComponent ],
      imports:[ HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisChatsComponent);
    component = fixture.componentInstance;
    servicio = TestBed.inject(ChatService);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    router.initialNavigation()
    fixture.detectChanges();
  });

  it('Carga mis chats', () => {
    spyOn(servicio, "getMisChats");
    component.ngOnInit();
    expect(servicio.getMisChats).toHaveBeenCalled(); 
  });

  it('Obtiene mis chats', () => {
    const chats:Chat[] = [{_id: "123456"},{_id: "654321"}]
    spyOn(servicio, "getMisChats").and.callFake(()=>Promise.resolve(chats));
    component.ngOnInit();
    expect(servicio.getMisChats).toHaveBeenCalled();
    fixture.whenStable().then(()=>{
        expect(component.misChats.length).toBe(2)
    })
  });

  it('Ver chat', () => {
    spyOn(servicio, "getMisChats");
    component.ngOnInit();
    expect(servicio.getMisChats).toHaveBeenCalled();
    component.mostrarChat("123456");
    fixture.whenStable().then(()=>{
        expect(location.path()).toBe("/chat/123456")
    })
  });

  

});
