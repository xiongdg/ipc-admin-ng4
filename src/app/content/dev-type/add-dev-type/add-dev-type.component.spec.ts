import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDevTypeComponent } from './add-dev-type.component';

describe('AddDevTypeComponent', () => {
  let component: AddDevTypeComponent;
  let fixture: ComponentFixture<AddDevTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDevTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDevTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
