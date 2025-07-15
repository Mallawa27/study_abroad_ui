import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  options = [
    { name: 'Country', description: 'Explore countries for studying abroad.' },
    { name: 'Course', description: 'Find courses that match your interests.' },
    { name: 'University Recommendation', description: 'Get personalized university recommendations.' }
  ];

  constructor(private router: Router) {}

  selectOption(option: string): void {
    if (option === 'University Recommendation') {
      this.router.navigate(['/question-form']);
    } else {
      // Placeholder for other options (Country, Course)
      alert(`Selected: ${option}. This feature is coming soon!`);
    }
  }
}