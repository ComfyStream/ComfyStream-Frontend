import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesProfesionalComponent } from './detalles-profesional.component';

describe('DetallesProfesionalComponent', () => {
  let component: DetallesProfesionalComponent;
  let fixture: ComponentFixture<DetallesProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
