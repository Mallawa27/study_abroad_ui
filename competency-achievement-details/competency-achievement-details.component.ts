import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-competency-achievement-details',
  templateUrl: './competency-achievement-details.component.html',
  styleUrls: ['./competency-achievement-details.component.css']
})
export class CompetencyAchievementDetailsComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() addAward = new EventEmitter<void>();

  // Preset competencies for dropdown
  competencies = ['Leadership', 'Teamwork', 'Communication', 'Problem-solving', 'Creativity'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Ensure the awards FormArray is initialized
    if (!this.formGroup.get('awards')) {
      this.formGroup.addControl('awards', this.fb.array([]));
    }
  }

  // Getter to access awards FormArray
  get awards(): FormArray {
    return this.formGroup.get('awards') as FormArray;
  }

  // Method to add a new award entry
  addAwardEntry(): void {
    const awardGroup = this.fb.group({
      title: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      description: ['']
    });
    this.awards.push(awardGroup);
  }
}
