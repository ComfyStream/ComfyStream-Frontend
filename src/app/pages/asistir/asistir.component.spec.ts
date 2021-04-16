import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistirComponent } from './asistir.component';

describe('AsistirComponent', () => {
  let component: AsistirComponent;
  let fixture: ComponentFixture<AsistirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
