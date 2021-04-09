import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisChatsComponent } from './mis-chats.component';

describe('MisChatsComponent', () => {
  let component: MisChatsComponent;
  let fixture: ComponentFixture<MisChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisChatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
