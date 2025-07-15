import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationActionsDialogComponent } from '../application-actions-dialog/application-actions-dialog.component';
import { DataService } from '../../services/data.service'; // Adjusted path

@Component({
  selector: 'app-application-listing',
  templateUrl: './application-listing.component.html',
  styleUrls: ['./application-listing.component.css']
})
export class ApplicationListingComponent {
  displayedColumns: string[] = [
    'applicationNumber',
    'country',
    'university',
    'course',
    'status',
    'actions',
  ];

  applications = [
    {
      applicationNumber: 'APPL001',
      country: 'USA',
      university: 'MIT',
      course: 'Computer Science',
      status: 'Pending',
    },
    {
      applicationNumber: 'APPL002',
      country: 'Canada',
      university: 'University of Toronto',
      course: 'Artificial Intelligence',
      status: 'Approved',
    },
  ];

  constructor(private dialog: MatDialog, private dataService: DataService) {}

  openActionsDialog(): void {
    const dialogRef = this.dialog.open(ApplicationActionsDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: this.applications[0] // Pass the first application as an example; adjust for the clicked row
    });
  }
}