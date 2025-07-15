import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-course-recommendation',
  templateUrl: './course-recommendation.component.html',
  styleUrls: ['./course-recommendation.component.css']
})
export class CourseRecommendationComponent implements OnInit {
  questionForm: FormGroup;
  currentQuestionIndex = 0;
  questions = [
    {
      question: 'What is your previous field of study?',
      options: [
        'Science and Technology',
        'Engineering',
        'Arts and Humanities',
        'Business and Management',
        'Medicine & Healthcare',
        'Commerce',
        'High School (Arts)',
        'High School (Science)',
        'High School (Commerce)'
      ]
    },
    {
      question: 'What is your GPA (on a 10-point scale)?',
      options: ['Below 7.0', '7.0 - 8.0', '8.0 - 9.0', 'Above 9.0']
    },
    {
      question: 'What is your budget for tuition fees per year (in USD)?',
      options: ['Below 10000', '10000 - 30000', '30000 - 50000', 'Above 50000']
    },
    {
      question: 'Which language proficiency test have you taken?',
      options: ['IELTS', 'TOEFL', 'Other', 'No test required']
    },
    {
      question: 'Do you require a scholarship?',
      options: ['Partial Scholarship', 'Full Scholarship', 'Self-Funded', 'Other']
    },
    {
      question: 'What are your preferred course requirements?',
      options: [
        'Specific GPA/grades, Entrance exams (GRE, GMAT, SAT)',
        'GPA only',
        'Work experience',
        'Entrance exams (GRE, GMAT, SAT)',
        'Specific GPA/grades, Entrance exams (GRE)',
        'Specific GPA/grades, Language proficiency (TestDaF)',
        'Specific GPA/grades, Language proficiency (IELTS)',
        'GPA and Exams'
      ]
    }
  ];
  answers: string[] = [];
  recommendations: any = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private recommendationService: RecommendationService
  ) {
    this.questionForm = this.fb.group({
      answer: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onOptionChange(): void {
    this.answers[this.currentQuestionIndex] = this.questionForm.get('answer').value;
  }

  nextQuestion(): void {
    if (this.questionForm.valid) {
      this.answers[this.currentQuestionIndex] = this.questionForm.get('answer').value;
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        this.questionForm.get('answer').setValidators([Validators.required]);
        this.questionForm.get('answer').updateValueAndValidity();
        this.questionForm.reset();
      } else {
        this.getRecommendations();
      }
    }
  }

  getRecommendations(): void {
    // Map GPA range to a numeric value
    let gpaValue: number;
    switch (this.answers[1]) {
      case 'Below 7.0':
        gpaValue = 6.5;
        break;
      case '7.0 - 8.0':
        gpaValue = 7.5;
        break;
      case '8.0 - 9.0':
        gpaValue = 8.5;
        break;
      case 'Above 9.0':
        gpaValue = 9.5;
        break;
      default:
        gpaValue = 8.5; // Fallback value
    }

    // Map tuitionFee range to a numeric value
    let tuitionFeeValue: number;
    switch (this.answers[2]) {
      case 'Below 10000':
        tuitionFeeValue = 5000;
        break;
      case '10000 - 30000':
        tuitionFeeValue = 15000;
        break;
      case '30000 - 50000':
        tuitionFeeValue = 30000;
        break;
      case 'Above 50000':
        tuitionFeeValue = 50000;
        break;
      default:
        tuitionFeeValue = 30000; // Fallback value
    }

    const userAnswers = {
      previousField: this.answers[0],
      gpa: gpaValue,
      tuitionFee: tuitionFeeValue,
      languageTest: this.answers[3],
      scholarship: this.answers[4],
      courseRequirements: this.answers[5]
    };

    this.recommendationService.getCourseRecommendations(userAnswers).subscribe({
      next: (response: any) => {
        this.recommendations = response;
        this.errorMessage = '';
      },
      error: (err: any) => {
        console.error('Error fetching course recommendations:', err);
        console.log('Sending user answers:', userAnswers);
        this.errorMessage = err.message || 'Failed to load course recommendations. Please try again later.';
        this.recommendations = null;
      }
    });
  }
}