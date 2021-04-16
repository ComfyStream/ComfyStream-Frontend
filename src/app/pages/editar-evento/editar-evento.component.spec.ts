import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEventoComponent } from './editar-evento.component';

describe('EditarEventoComponent', () => {
  let component: EditarEventoComponent;
  let fixture: ComponentFixture<EditarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
