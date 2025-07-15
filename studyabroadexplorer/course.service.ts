import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses = [
    { name: 'PhD in Computer Engineering', university: 'MIT', location: 'USA', rating: 4.8, type: 'phd', field: 'engineering', introduction: 'Advanced study in computing systems.', highlights: ['Cutting-edge research', 'Industry collaboration'], fees: '$50,000/year' },
    { name: 'MSc in Civil Engineering', university: 'University of Tokyo', location: 'Japan', rating: 4.7, type: 'masters', field: 'engineering', introduction: 'Focus on infrastructure design.', highlights: ['Practical projects', 'Global recognition'], fees: '¥1,200,000/year' },
    { name: 'BTech in Computer Science', university: 'Stanford University', location: 'USA', rating: 4.8, type: 'bachelors', field: 'engineering', introduction: 'Foundation in computer science.', highlights: ['Innovative curriculum', 'Tech internships'], fees: '$45,000/year' },
    // Add more courses with details (omitted for brevity, replicate for all 45 courses)
  ];

  getCourseByName(name: string) {
    return this.courses.find(course => course.name === name) || null;
  }
}