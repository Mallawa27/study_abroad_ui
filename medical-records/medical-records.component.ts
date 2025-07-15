import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent implements OnInit {
  medicalRecordsForm: FormGroup;
  @Output() formValueChange = new EventEmitter<any>(); // Added to emit form changes

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.medicalRecordsForm = this.fb.group({
      hasMedicalCondition: ['no', Validators.required],
      conditionDetails: ['']
    });

    // Emit form value changes to parent
    this.medicalRecordsForm.valueChanges.subscribe(value => {
      this.formValueChange.emit(value);
    });
  }
}