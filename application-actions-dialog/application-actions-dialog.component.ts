import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service'; // Adjusted path
import { Input } from '@angular/core';

@Component({
  selector: 'app-application-actions-dialog',
  templateUrl: './application-actions-dialog.component.html',
  styleUrls: ['./application-actions-dialog.component.css']
})
export class ApplicationActionsDialogComponent {
  @Input() application: any;

  constructor(
    private dialogRef: MatDialogRef<ApplicationActionsDialogComponent>,
    private router: Router,
    private dataService: DataService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  onEdit(): void {
    if (this.application) {
      this.dataService.setSelectedApplication(this.application);
    }
    this.router.navigate(['/application-form']);
    this.dialogRef.close();
  }
}