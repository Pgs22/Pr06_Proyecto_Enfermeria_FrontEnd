import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseRegister } from './nurse-register';

describe('NurseRegister', () => {
  let component: NurseRegister;
  let fixture: ComponentFixture<NurseRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
