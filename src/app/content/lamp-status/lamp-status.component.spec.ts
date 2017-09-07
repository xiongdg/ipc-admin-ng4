import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LampStatusComponent } from './lamp-status.component';

describe('LampStatusComponent', () => {
  let component: LampStatusComponent;
  let fixture: ComponentFixture<LampStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LampStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
