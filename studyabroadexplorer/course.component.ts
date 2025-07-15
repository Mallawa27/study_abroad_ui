import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  showExplorer: boolean = false;
  filters = {
    phd: false,
    masters: false,
    bachelors: false,
    engineering: false,
    arts: false,
    business: false,
    commerce: false,
    literature: false,
    science: false
  };
  courses = [
    { name: 'PhD in Computer Engineering', duration: '4 years', rating: 4.8, type: 'phd', field: 'engineering' },
    { name: 'PhD in Mechanical Engineering', duration: '4 years', rating: 4.7, type: 'phd', field: 'engineering' },
    { name: 'PhD in Electrical Engineering', duration: '4 years', rating: 4.6, type: 'phd', field: 'engineering' },
    { name: 'PhD in Visual Arts', duration: '4 years', rating: 4.5, type: 'phd', field: 'arts' },
    { name: 'PhD in Art History', duration: '4 years', rating: 4.4, type: 'phd', field: 'arts' },
    { name: 'PhD in Business Administration', duration: '4 years', rating: 4.9, type: 'phd', field: 'business' },
    { name: 'PhD in Finance', duration: '4 years', rating: 4.7, type: 'phd', field: 'business' },
    { name: 'PhD in Economics', duration: '4 years', rating: 4.6, type: 'phd', field: 'commerce' },
    { name: 'PhD in Accounting', duration: '4 years', rating: 4.5, type: 'phd', field: 'commerce' },
    { name: 'PhD in English Literature', duration: '4 years', rating: 4.4, type: 'phd', field: 'literature' },
    { name: 'PhD in Comparative Literature', duration: '4 years', rating: 4.3, type: 'phd', field: 'literature' },
    { name: 'PhD in Data Science', duration: '4 years', rating: 4.8, type: 'phd', field: 'science' },
    { name: 'PhD in Environmental Science', duration: '4 years', rating: 4.7, type: 'phd', field: 'science' },
    { name: 'PhD in Biotechnology', duration: '4 years', rating: 4.6, type: 'phd', field: 'science' },
    { name: 'PhD in Artificial Intelligence', duration: '4 years', rating: 4.9, type: 'phd', field: 'engineering' },
    { name: 'MSc in Civil Engineering', duration: '2 years', rating: 4.7, type: 'masters', field: 'engineering' },
    { name: 'MSc in Software Engineering', duration: '2 years', rating: 4.8, type: 'masters', field: 'engineering' },
    { name: 'MSc in Robotics', duration: '2 years', rating: 4.6, type: 'masters', field: 'engineering' },
    { name: 'MA in Fine Arts', duration: '2 years', rating: 4.5, type: 'masters', field: 'arts' },
    { name: 'MA in Performing Arts', duration: '2 years', rating: 4.4, type: 'masters', field: 'arts' },
    { name: 'MBA in Business Management', duration: '2 years', rating: 4.9, type: 'masters', field: 'business' },
    { name: 'MBA in Marketing', duration: '2 years', rating: 4.8, type: 'masters', field: 'business' },
    { name: 'MCom in International Trade', duration: '2 years', rating: 4.6, type: 'masters', field: 'commerce' },
    { name: 'MCom in Financial Management', duration: '2 years', rating: 4.5, type: 'masters', field: 'commerce' },
    { name: 'MA in English Literature', duration: '2 years', rating: 4.4, type: 'masters', field: 'literature' },
    { name: 'MA in Creative Writing', duration: '2 years', rating: 4.3, type: 'masters', field: 'literature' },
    { name: 'MSc in Physics', duration: '2 years', rating: 4.7, type: 'masters', field: 'science' },
    { name: 'MSc in Chemistry', duration: '2 years', rating: 4.6, type: 'masters', field: 'science' },
    { name: 'MSc in Marine Biology', duration: '2 years', rating: 4.5, type: 'masters', field: 'science' },
    { name: 'MSc in Machine Learning', duration: '2 years', rating: 4.8, type: 'masters', field: 'engineering' },
    { name: 'BTech in Computer Science', duration: '4 years', rating: 4.8, type: 'bachelors', field: 'engineering' },
    { name: 'BTech in Mechanical Engineering', duration: '4 years', rating: 4.7, type: 'bachelors', field: 'engineering' },
    { name: 'BTech in Chemical Engineering', duration: '4 years', rating: 4.6, type: 'bachelors', field: 'engineering' },
    { name: 'BA in Visual Arts', duration: '3 years', rating: 4.5, type: 'bachelors', field: 'arts' },
    { name: 'BA in Music', duration: '3 years', rating: 4.4, type: 'bachelors', field: 'arts' },
    { name: 'BBA in Business Management', duration: '3 years', rating: 4.7, type: 'bachelors', field: 'business' },
    { name: 'BBA in Entrepreneurship', duration: '3 years', rating: 4.6, type: 'bachelors', field: 'business' },
    { name: 'BCom in Accounting', duration: '3 years', rating: 4.5, type: 'bachelors', field: 'commerce' },
    { name: 'BCom in Economics', duration: '3 years', rating: 4.4, type: 'bachelors', field: 'commerce' },
    { name: 'BA in English Literature', duration: '3 years', rating: 4.3, type: 'bachelors', field: 'literature' },
    { name: 'BA in Linguistics', duration: '3 years', rating: 4.2, type: 'bachelors', field: 'literature' },
    { name: 'BSc in Biology', duration: '3 years', rating: 4.6, type: 'bachelors', field: 'science' },
    { name: 'BSc in Astronomy', duration: '3 years', rating: 4.5, type: 'bachelors', field: 'science' },
    { name: 'BSc in Environmental Science', duration: '3 years', rating: 4.4, type: 'bachelors', field: 'science' },
    { name: 'BTech in Aerospace Engineering', duration: '4 years', rating: 4.7, type: 'bachelors', field: 'engineering' }
  ];
  filteredCourses: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filterCourses(); // Initialize with all courses
  }

  toggleExplorer() {
    this.showExplorer = !this.showExplorer;
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter(course => {
      const degreeMatch = (this.filters.phd && course.type === 'phd') ||
                          (this.filters.masters && course.type === 'masters') ||
                          (this.filters.bachelors && course.type === 'bachelors') ||
                          (!this.filters.phd && !this.filters.masters && !this.filters.bachelors);

      const fieldMatch = (this.filters.engineering && course.field === 'engineering') ||
                         (this.filters.arts && course.field === 'arts') ||
                         (this.filters.business && course.field === 'business') ||
                         (this.filters.commerce && course.field === 'commerce') ||
                         (this.filters.literature && course.field === 'literature') ||
                         (this.filters.science && course.field === 'science') ||
                         (!this.filters.engineering && !this.filters.arts && !this.filters.business &&
                          !this.filters.commerce && !this.filters.literature && !this.filters.science);

      return degreeMatch && fieldMatch;
    });
  }

  navigateToCourse(courseName: string) {
    this.router.navigate([`/studyabroadexplorer/course/${courseName}`]);
  }
}