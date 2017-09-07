import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevTypeInfoComponent } from './dev-type-info.component';

describe('DevTypeInfoComponent', () => {
  let component: DevTypeInfoComponent;
  let fixture: ComponentFixture<DevTypeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevTypeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
