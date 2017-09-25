import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRomVerComponent } from './add-rom-ver.component';

describe('AddRomVerComponent', () => {
  let component: AddRomVerComponent;
  let fixture: ComponentFixture<AddRomVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRomVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRomVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
