import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDevComponent } from './add-dev.component';

describe('AddDevComponent', () => {
  let component: AddDevComponent;
  let fixture: ComponentFixture<AddDevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
