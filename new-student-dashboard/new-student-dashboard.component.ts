import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-student-dashboard',
  templateUrl: './new-student-dashboard.component.html',
  styleUrls: ['./new-student-dashboard.component.css']
})
export class NewStudentDashboardComponent implements OnInit {
  userId: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      // No user logged in, redirect to login
      this.router.navigate(['/login']);
    } else {
      this.userId = storedUserId;
      console.log('Logged-in Student User ID:', this.userId);
    }
  }

  navigateToApplication() {
    this.router.navigate(['/application-form']);
  }
  
  navigateToRecommendations() {
  this.router.navigate(['/recommendation-options']);
}


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

