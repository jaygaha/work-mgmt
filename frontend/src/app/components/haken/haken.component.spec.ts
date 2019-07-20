import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HakenComponent } from './haken.component';

describe('HakenComponent', () => {
  let component: HakenComponent;
  let fixture: ComponentFixture<HakenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HakenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
