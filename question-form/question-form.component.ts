import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  questionForm: FormGroup;
  currentQuestionIndex = 0;
  questions = [
    {
      question: 'What is your preferred study destination?',
      options: ['USA', 'UK', 'CANADA', 'AUSTRALIA', 'GERMANY', 'Other'],
    },
    {
      question: 'What is your preferred degree level?',
      options: ['Bachelors', 'Masters', ],
    },
    {
      question: 'What is your field of interest?',
      options: [
        'Science and Technology',
        'Engineering',
        'Business and Management',
        'Arts and Humanities',
        'Medicine & Healthcare',
        'Commerce'
      ],
    },
    {
      question: 'What is your GPA (on a 10-point scale)?',
      options: ['Below 7.0', '7.0 - 8.0', '8.0 - 9.0', 'Above 9.0'],
    },
    {
      question: 'What is your budget for tuition fees per year (in USD)?',
      options: ['Below 10000', '10000 - 30000', '30000 - 50000', 'Above 50000'],
    },
    {
      question: 'Do you require a scholarship?',
      options: ['Yes, full scholarship', 'Yes, partial scholarship', 'No, self-funded'],
    },
    {
      question: 'What is your preferred mode of study?',
      options: ['Full-time on campus', 'Hybrid (online + on-campus)', 'Online'],
    },
    {
      question: 'What is your preferred course duration?',
      options: ['1 year', '2 years', '3+ years'],
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
        this.questionForm.reset();
      } else {
        this.getRecommendations();
      }
    }
  }

  getRecommendations(): void {
    // Map GPA range to a numeric value for backend processing
    let gpaValue: number;
    switch (this.answers[3]) {
      case 'Below 7.0':
        gpaValue = 6.5; // Will cause backend error (GPA <= 7)
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
        gpaValue = 8.5; // Default to valid value
    }

    // Map budget range to a numeric value
    let budgetValue: number;
    switch (this.answers[4]) {
      case 'Below 10000':
        budgetValue = 5000;
        break;
      case '10000 - 30000':
        budgetValue = 15000;
        break;
      case '30000 - 50000':
        budgetValue = 30000;
        break;
      case 'Above 50000':
        budgetValue = 50000;
        break;
      default:
        budgetValue = 30000; // Default to valid value
    }

    const userAnswers = {
      country: this.answers[0],
      previousField: this.answers[2], // Maps to 'Previous Field' in backend
      gpa: gpaValue,
      tuitionFee: budgetValue, // Maps to 'Tuition Fee' in backend
      scholarship: this.answers[5],
      modeOfStudy: this.answers[6], // Maps to 'Mode of Study' in backend
      duration: this.answers[7]
    };

    this.recommendationService.getRecommendations(userAnswers).subscribe({
      next: (response: any) => {
        this.recommendations = response;
        this.errorMessage = '';
      },
      error: (err: any) => {
        console.error('Error fetching recommendations:', err);
        console.log('Sending user answers:', userAnswers);
        this.errorMessage = err.message || 'Failed to load recommendations. Please try again later.';
        this.recommendations = null;
      }
    });
  }
}