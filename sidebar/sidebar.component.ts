import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  showStudyAbroadOptions = false; // Toggle for nested Study Abroad options
  isYourApplicationActive = false; // Track if Your Application is active

  @Output() yourApplicationClicked = new EventEmitter<void>(); // Emit event to parent

  constructor() {
    console.log('SidebarComponent Loaded'); // Debug Log
  }

  toggleStudyAbroad() {
    this.showStudyAbroadOptions = !this.showStudyAbroadOptions;
  }

  onYourApplicationClick() {
    this.isYourApplicationActive = true; // Highlight Your Application
    //this.yourApplicationClicked.emit(); // Notify parent to show the application form
  }
}