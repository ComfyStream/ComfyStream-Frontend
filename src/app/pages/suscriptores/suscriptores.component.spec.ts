import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriptoresComponent } from './suscriptores.component';

describe('SuscriptoresComponent', () => {
  let component: SuscriptoresComponent;
  let fixture: ComponentFixture<SuscriptoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuscriptoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscriptoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
