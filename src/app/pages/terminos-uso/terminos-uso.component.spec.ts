import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminosUsoComponent } from './terminos-uso.component';

describe('TerminosUsoComponent', () => {
  let component: TerminosUsoComponent;
  let fixture: ComponentFixture<TerminosUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminosUsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminosUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
