import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCricketersComponent } from './display-cricketers.component';

describe('DisplayCricketersComponent', () => {
  let component: DisplayCricketersComponent;
  let fixture: ComponentFixture<DisplayCricketersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCricketersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCricketersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
