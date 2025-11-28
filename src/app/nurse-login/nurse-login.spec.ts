import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseLogin } from './nurse-login';

describe('NurseLogin', () => {
  let component: NurseLogin;
  let fixture: ComponentFixture<NurseLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
