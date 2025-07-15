import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorMessage: string ;

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch the error message from query parameters if available
    
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params['message'] || 'An unknown error occurred.';
    });
  }dismissError(): void {
    this.errorMessage = ''; // Clear the error message
  }

 
}