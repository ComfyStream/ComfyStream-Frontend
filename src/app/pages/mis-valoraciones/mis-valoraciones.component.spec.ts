import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisValoracionesComponent } from './mis-valoraciones.component';

describe('MisValoracionesComponent', () => {
  let component: MisValoracionesComponent;
  let fixture: ComponentFixture<MisValoracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisValoracionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisValoracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
