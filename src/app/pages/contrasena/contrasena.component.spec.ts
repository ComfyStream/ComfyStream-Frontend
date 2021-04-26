import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrasenaComponent } from './contrasena.component';

describe('ContrasenaComponent', () => {
  let component: ContrasenaComponent;
  let fixture: ComponentFixture<ContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrasenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
