import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCricketerComponent } from './add-cricketer.component';

describe('AddCricketerComponent', () => {
  let component: AddCricketerComponent;
  let fixture: ComponentFixture<AddCricketerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCricketerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCricketerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
