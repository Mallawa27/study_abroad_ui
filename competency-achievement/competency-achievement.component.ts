import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-competency-achievement',
  templateUrl: './competency-achievement.component.html',
  styleUrls: ['./competency-achievement.component.css']
})
export class CompetencyAchievementComponent {
  @Input() formGroup: FormGroup;

  competencyOptions: string[] = ['Leadership', 'Technical Skills', 'Communication', 'Teamwork'];

  get achievements(): FormArray {
    return this.formGroup.get('achievements') as FormArray;
  }
}
