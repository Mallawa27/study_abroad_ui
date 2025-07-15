import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { DocumentationComponent } from '../documentation/documentation.component';
import { TestScoresComponent } from '../test-scores/test-scores.component';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit, AfterViewInit {
  @ViewChild('documentationComponent') documentationComponent: DocumentationComponent;
  @ViewChild('testScoresComponent') testScoresComponent: TestScoresComponent;

  countrySelectionForm: FormGroup;
  basicDetailsForm: FormGroup;
  addressForm: FormGroup;
  educationForm: FormGroup;
  experienceForm: FormGroup;
  languageCertificationForm: FormGroup;
  competencyAchievementForm: FormGroup;
  medicalRecordsForm: FormGroup;

  currentStep = 0;
  selectedUniversities: string[] = [];
  selectedCourses: { [university: string]: string[] } = {};

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.countrySelectionForm = this.fb.group({
      selectedCountries: this.fb.array([], Validators.required)
    });

    this.basicDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      guardianFirstName: ['', Validators.required],
      guardianLastName: ['', Validators.required],
      guardianEmail: ['', [Validators.required, Validators.email]],
      guardianPhoneNumber: ['', Validators.required],
    });

    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      streetAddress: ['', Validators.required],
      landmark: ['', Validators.required]
    });

    this.educationForm = this.fb.group({
      educationEntries: this.fb.array([this.createEducationEntry()])
    });

    this.experienceForm = this.fb.group({
      experienceEntries: this.fb.array([this.createExperienceEntry()])
    });

    this.languageCertificationForm = this.fb.group({
      languageCertificationEntries: this.fb.array([this.createLanguageCertificationEntry()])
    });

    this.competencyAchievementForm = this.fb.group({
      competency: [[], Validators.required],  // ✅ Start as an empty array
      achievements: this.fb.array([this.createAchievementEntry()])
    });
    

    this.medicalRecordsForm = this.fb.group({
      hasMedicalCondition: [null, Validators.required],
      conditionDetails: ['']
    });

    this.dataService.selectedApplication$.subscribe(application => {
      if (application) {
        this.countrySelectionForm.get('selectedCountries').patchValue([application.country]);
      }
    });

   
  }

  ngAfterViewInit(): void {
    
  }
  get documentationForm(): FormGroup {
    return this.documentationComponent ? this.documentationComponent.documentationForm : null;
  }

  createEducationEntry(): FormGroup {
    return this.fb.group({
      levelOfEducation: ['', Validators.required],
      schoolName: ['', Validators.required],
      state: ['', Validators.required],
      startYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      fieldOfStudy: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      endYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      degreeType: this.fb.group({
        bachelor: [false],
        master: [false],
        phd: [false]
      })
    });
  }

  createExperienceEntry(): FormGroup {
    return this.fb.group({
      type: [[], Validators.required],
      totalYears: ['', Validators.required],
      professionalArea: ['', Validators.required],
      designation: ['', Validators.required],
      subAreas: ['', Validators.required],
      company: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      jobTitle: ['', Validators.required],
      state: ['', Validators.required],
      startYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      endYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      description: ['']
    });
  }

  createLanguageCertificationEntry(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      startYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      endYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }

  createAchievementEntry(): FormGroup {
    return this.fb.group({
      awardTitle: ['', Validators.required],
      awardYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      description: ['', Validators.required]
    });
  }

  get selectedCountries(): FormArray {
    return this.countrySelectionForm.get('selectedCountries') as FormArray;
  }

  get educationEntries(): FormArray {
    return this.educationForm.get('educationEntries') as FormArray;
  }

  get experienceEntries(): FormArray {
    return this.experienceForm.get('experienceEntries') as FormArray;
  }

  get languageCertificationEntries(): FormArray {
    return this.languageCertificationForm.get('languageCertificationEntries') as FormArray;
  }

  get achievementEntries(): FormArray {
    return this.competencyAchievementForm.get('achievements') as FormArray;
  }

  get documents(): FormArray {
    return this.documentationForm.get('documents') as FormArray;
  }

  addEducationEntry(): void {
    this.educationEntries.push(this.createEducationEntry());
  }

  addExperienceEntry(): void {
    this.experienceEntries.push(this.createExperienceEntry());
  }

  addLanguageCertificationEntry(): void {
    this.languageCertificationEntries.push(this.createLanguageCertificationEntry());
  }

  onCountrySelected(selectedCountries: string[]): void {
    const formArray = this.countrySelectionForm.get('selectedCountries') as FormArray;
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
    selectedCountries.forEach(country => formArray.push(this.fb.control(country)));
  }

  onUniversitySelected(event: { universities: string[], courses: { [university: string]: string[] } }): void {
    this.selectedUniversities = event.universities;
    this.selectedCourses = event.courses;
  }

  onSubmit(): void {
    if (
      this.countrySelectionForm.valid &&
      this.basicDetailsForm.valid &&
      this.addressForm.valid &&
      this.educationForm.valid &&
      this.experienceForm.valid &&
      this.languageCertificationForm.valid &&
      this.competencyAchievementForm.valid &&
      this.medicalRecordsForm.valid &&
      this.testScoresComponent.testScoresForm.valid &&
      this.documentationForm.valid
    ) {
      console.log('Form Data:', {
        countrySelection: this.countrySelectionForm.value,
        universities: this.selectedUniversities,
        courses: this.selectedCourses,
        basicDetails: this.basicDetailsForm.value,
        address: this.addressForm.value,
        education: this.educationForm.value,
        experience: this.experienceForm.value,
        languageCertification: this.languageCertificationForm.value,
        competencyAchievements: this.competencyAchievementForm.value,
        medicalRecords: this.medicalRecordsForm.value,
        testScores: this.testScoresComponent.testScoresForm.value,
        documentationForm: this.documentationForm.value
      });
    }
  }

  onMedicalRecordsChange(value: any): void {
    this.medicalRecordsForm.patchValue(value);
  }
}