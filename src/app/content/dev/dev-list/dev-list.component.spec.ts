import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevListComponent } from './dev-list.component';

describe('DevListComponent', () => {
  let component: DevListComponent;
  let fixture: ComponentFixture<DevListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
