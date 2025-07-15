import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-language-certification-details',
  templateUrl: './language-certification-details.component.html',
  styleUrls: ['./language-certification-details.component.css']
})
export class LanguageCertificationDetailsComponent {
  @Input() formArray: FormArray;
  @Output() addEntry = new EventEmitter<void>();

}

