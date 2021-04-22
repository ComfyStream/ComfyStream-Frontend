import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerProfesionalComponent } from './ser-profesional.component';

describe('SerProfesionalComponent', () => {
  let component: SerProfesionalComponent;
  let fixture: ComponentFixture<SerProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
