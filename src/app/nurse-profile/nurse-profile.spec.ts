import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseProfile } from './nurse-profile';

describe('NurseProfile', () => {
  let component: NurseProfile;
  let fixture: ComponentFixture<NurseProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
