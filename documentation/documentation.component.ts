import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  documentationForm: FormGroup;
  documentTypes = ['Country Document', 'Basic Document', 'University Document'];
  currentTypeIndex = 0;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.documentationForm = this.fb.group({
      documents: this.fb.array([this.createDocumentGroup()])
    });
  }

  get documents(): FormArray {
    return this.documentationForm.get('documents') as FormArray;
  }

  createDocumentGroup(): FormGroup {
    const type = this.documentTypes[this.currentTypeIndex];
    this.currentTypeIndex = (this.currentTypeIndex + 1) % this.documentTypes.length;
    
    return this.fb.group({
      documentType: [type],
      documentName: [''],
      file: [null, [Validators.required, this.fileValidator]]
    });
  }

  fileValidator(control: AbstractControl) {
    const value = control.value;
    if (!value || (value instanceof File && value.size === 0)) {
      return { required: true };
    }
    return null;
  }

  addDocument(): void {
    if (this.documents.length < this.documentTypes.length) {
      this.documents.push(this.createDocumentGroup());
    }
  }

  removeDocument(index: number): void {
    this.documents.removeAt(index);
    this.currentTypeIndex = this.documents.length % this.documentTypes.length;
  }

  onFileChange(event: any, index: number): void {
    const control = this.documents.at(index);
    const fileInput = event.target as HTMLInputElement;
    
    if (fileInput.files && fileInput.files.length > 0) {
      const uploadedFile = fileInput.files[0];
      control.get('file').setValue(uploadedFile);
    } else {
      control.get('file').setValue(null);
    }

    control.get('file').markAsTouched();
    control.get('file').markAsDirty();
    control.get('file').updateValueAndValidity();
    this.documentationForm.updateValueAndValidity();
    this.cdr.detectChanges();
  }
}
