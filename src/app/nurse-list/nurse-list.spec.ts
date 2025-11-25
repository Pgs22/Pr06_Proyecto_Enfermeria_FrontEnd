import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseList } from './nurse-list';

describe('NurseList', () => {
  let component: NurseList;
  let fixture: ComponentFixture<NurseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
