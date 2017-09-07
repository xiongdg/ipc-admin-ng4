import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevTypeListComponent } from './dev-type-list.component';

describe('DevTypeListComponent', () => {
  let component: DevTypeListComponent;
  let fixture: ComponentFixture<DevTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
