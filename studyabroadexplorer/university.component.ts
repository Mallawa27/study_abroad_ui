import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uni',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniComponent implements OnInit {
  showExplorer: boolean = false;
  filters = {
    country: '',
    courseLevel: '',
    exams: {
      ielts: false,
      toefl: false,
      sat: false,
      gmat: false,
      gre: false
    }
  };
  universities = [
    { name: 'University of Oxford', country: 'uk', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'] },
    { name: 'Harvard University', country: 'usa', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['sat', 'gmat', 'gre', 'toefl'] },
    { name: 'University of Toronto', country: 'canada', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'] },
    { name: 'University of Tokyo', country: 'japan', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['toefl', 'gre'] },
    { name: 'University of Melbourne', country: 'australia', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'] },
    { name: 'Trinity College Dublin', country: 'ireland', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'] },
    { name: 'Technical University of Munich', country: 'germany', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl', 'gre'] },
    { name: 'Stanford University', country: 'usa', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['sat', 'gmat', 'gre', 'toefl'] },
    { name: 'University of Cambridge', country: 'uk', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'] },
    { name: 'McGill University', country: 'canada', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'] },
  ];
  filteredUniversities: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filterUniversities(); // Initialize with all universities
  }

  toggleExplorer() {
    this.showExplorer = !this.showExplorer;
  }

  filterUniversities() {
    this.filteredUniversities = this.universities.filter(uni => {
      const countryMatch = !this.filters.country || uni.country === this.filters.country;
      const courseLevelMatch = !this.filters.courseLevel || uni.courseLevels.includes(this.filters.courseLevel);
      const examsMatch = (
        (this.filters.exams.ielts && uni.examsAccepted.includes('ielts')) ||
        (this.filters.exams.toefl && uni.examsAccepted.includes('toefl')) ||
        (this.filters.exams.sat && uni.examsAccepted.includes('sat')) ||
        (this.filters.exams.gmat && uni.examsAccepted.includes('gmat')) ||
        (this.filters.exams.gre && uni.examsAccepted.includes('gre')) ||
        (!this.filters.exams.ielts && !this.filters.exams.toefl && !this.filters.exams.sat &&
         !this.filters.exams.gmat && !this.filters.exams.gre)
      );
      return countryMatch && courseLevelMatch && examsMatch;
    });
  }

  navigateToUniversity(uniName: string) {
    this.router.navigate([`/studyabroadexplorer/university/${encodeURIComponent(uniName)}`]);
  }
}