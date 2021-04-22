import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorarProfesionalComponent } from './valorar-profesional.component';

describe('ValorarProfesionalComponent', () => {
  let component: ValorarProfesionalComponent;
  let fixture: ComponentFixture<ValorarProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValorarProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorarProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
