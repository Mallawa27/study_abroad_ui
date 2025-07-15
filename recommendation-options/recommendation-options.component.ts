// src/app/components/recommendation-options/recommendation-options.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendation-options',
  templateUrl: './recommendation-options.component.html',
  styleUrls: ['./recommendation-options.component.css']
})
export class RecommendationOptionsComponent {
  constructor(private router: Router) {}

  goToRecommendation(type: string) {
    if (type === 'country') {
      this.router.navigate(['/country-question-form']);
    } else if (type === 'university') {
      this.router.navigate(['/question-form']);
    } else if (type === 'course') {
      this.router.navigate(['/course-recommendation']);
    }
  }
}
