import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTarjetaComponent } from './chat-tarjeta.component';

describe('ChatTarjetaComponent', () => {
  let component: ChatTarjetaComponent;
  let fixture: ComponentFixture<ChatTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
