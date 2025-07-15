import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyAchievementDetailsComponent } from './competency-achievement-details.component';

describe('CompetencyAchievementDetailsComponent', () => {
  let component: CompetencyAchievementDetailsComponent;
  let fixture: ComponentFixture<CompetencyAchievementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetencyAchievementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyAchievementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
