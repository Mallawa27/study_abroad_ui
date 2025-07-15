import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-country-question-form',
  templateUrl: './country-question-form.component.html',
  styleUrls: ['./country-question-form.component.css']
})
export class CountryQuestionFormComponent implements OnInit {
  questionForm: FormGroup;
  currentQuestionIndex = 0;
  questions = [
    {
      question: 'What is your GPA (on a 10-point scale)?',
      options: ['Below 7.0', '7.0 - 8.0', '8.0 - 9.0', 'Above 9.0'],
    },
    {
      question: 'What is your budget for tuition fees per year (in USD)?',
      options: ['Below 10000', '10000 - 30000', '30000 - 50000', 'Above 50000'],
    },
    {
      question: 'What is your budget for cost of living per year (in USD)?',
      options: ['Below 10000', '10000 - 20000', '20000 - 35000', 'Above 35000'],
    },
    {
      question: 'How important is cultural diversity (on a scale of 2 to 5)?',
      options: ['2', '3', '4', '5'],
    },
    {
      question: 'What is your previous field of study?',
      options: [
        'Engineering',
        'Business Management',
        'Computer Science',
        'Arts and Humanities',
        'Medicine & Healthcare',
        'Commerce',
        'Psychology',
        'Sustainable Energy'
      ],
    },
    {
      question: 'What are your work opportunities after graduation?',
      options: [
        'Found Job (3 Months)',
        'Found Job (6 Months)',
        'No Job Found',
        'Not Seeking Job'
      ],
    },
    {
      question: 'What are the course admission requirements?',
      options: [
        'Specific GPA/grades, Entrance exams (GRE, GMAT, SAT)',
        'Entrance exams (GRE, GMAT, SAT)',
        'Specific GPA/grades',
        'No Specific Requirements'
      ],
    },
    {
      question: 'Do you require a scholarship?',
      options: ['Full Scholarship', 'Partial Scholarship', 'No Scholarship']
    }
  ];
  answers: string[] = [];
  recommendations: string[] | null = null;
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
    // Map GPA range to a numeric value
    let gpaValue: number;
    switch (this.answers[0]) {
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
        gpaValue = 7.5; // Default to valid value
    }

    // Map tuition fee range to a numeric value
    let tuitionValue: number;
    switch (this.answers[1]) {
      case 'Below 10000':
        tuitionValue = 5000;
        break;
      case '10000 - 30000':
        tuitionValue = 15000;
        break;
      case '30000 - 50000':
        tuitionValue = 30000;
        break;
      case 'Above 50000':
        tuitionValue = 50000;
        break;
      default:
        tuitionValue = 15000; // Default to valid value
    }

    // Map cost of living range to a numeric value
    let costOfLivingValue: number;
    switch (this.answers[2]) {
      case 'Below 10000':
        costOfLivingValue = 5000;
        break;
      case '10000 - 20000':
        costOfLivingValue = 15000;
        break;
      case '20000 - 35000':
        costOfLivingValue = 25000;
        break;
      case 'Above 35000':
        costOfLivingValue = 40000;
        break;
      default:
        costOfLivingValue = 15000; // Default to valid value
    }

    // Map cultural diversity to a numeric value
    let culturalDiversityValue: number = parseFloat(this.answers[3]) || 3.0;

    const userAnswers = {
      gpa: gpaValue,
      tuition_fee: tuitionValue,
      cost_of_living: costOfLivingValue,
      cultural_diversity: culturalDiversityValue,
      previous_field: this.answers[4],
      work_opportunities: this.answers[5],
      course_requirements: this.answers[6],
      scholarship: this.answers[7]
    };

    this.recommendationService.getCountryRecommendations(userAnswers).subscribe({
      next: (response: any) => {
        this.recommendations = response.recommended_countries;
        this.errorMessage = '';
      },
      error: (err: any) => {
        console.error('Error fetching recommendations:', err);
        console.log('Sending user answers:', userAnswers);
        this.errorMessage = err.message || 'Failed to load country recommendations. Please try again later.';
        this.recommendations = null;
      }
    });
  }
}
