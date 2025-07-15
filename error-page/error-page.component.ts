import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string ;

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params['message'] || 'An unknown error occurred.';
    });
  }dismissError(): void {
    this.errorMessage = ''; 
  }
  Return(): void {
    window.history.back(); //provided by js itself
  }

 
}