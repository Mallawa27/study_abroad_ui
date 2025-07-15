import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.css']
})
export class ExperienceDetailsComponent {
  @Input() formArray: FormArray;
  @Output() addEntry = new EventEmitter<void>();

  jobTypes = ['Job Application', 'Internship'];  // Options for the dropdown
}

