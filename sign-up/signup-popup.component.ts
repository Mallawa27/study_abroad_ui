// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-signup-popup',
//   templateUrl: './signup-popup.component.html',
//   styleUrls: ['./signup-popup.component.css']
// })
// export class SignupPopupComponent implements OnInit {
//   signupForm: FormGroup;
//   countries: any[] = []; 
//   private apiEndpoint = 'http://localhost:8080/user'; 
//   private countriesApiEndpoint = 'http://localhost:8080/api/countries'; 
//   alertMessage: string;

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router,
//     public dialogRef: MatDialogRef<SignupPopupComponent>
//   ) {
//     this.signupForm = this.fb.group({
//       firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
//       lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
//       email: ['', [Validators.required, Validators.email]],
//       phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//       country: ['', Validators.required], 
//       pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
//     });
//   }

//   ngOnInit(): void {
//     this.fetchCountries();
//   }

//   fetchCountries(): void {
//     this.http.get<any[]>(this.countriesApiEndpoint)
//       .pipe(
//         catchError(error => {
//           console.error('Error fetching countries:', error);
//           return of([]);
//         })
//       )
//       .subscribe(response => {
//         this.countries = response; // Update the array with country data
//       });
//   }

//   createAccount(): void {
//     if (this.signupForm.invalid) {
//       this.signupForm.markAsTouched(); // Ensure all controls are marked as touched
//       return; 
//     }

//     const signupData = {
//       ...this.signupForm.value,
//       countryId: this.signupForm.value.country // Map the selected country ID
//     };

//     this.http.post<any>(this.apiEndpoint, signupData)
//       .pipe(
//         catchError(error => {
//           console.error('Signup error:', error);
//         console.log('Error status:', error.status);
//         console.log('Error body:', error.error);
//           if (error.status === 400 && error.error) {
//             if (error.error.error) {
//               // Redirect to error page and close the dialog
//               this.router.navigate(['/sucess'], { queryParams: { message: error.error.error } })
//                 .then(() => {
//                   if (this.dialogRef) {
//                     this.dialogRef.close();
//                   }
//                 });
//             }else{
//             this.setServerErrors(error.error);
//             }
//           } else if (error.status === 500) {
//             this.router.navigate(['/error'])
//               .then(() => {
//                 if (this.dialogRef) {
//                   this.dialogRef.close();
//                 }
//               });
//           }
//           return of(null);
//         })
//       )
//       .subscribe(response => {
//         if (response) {
//           console.log('Signup response:', response);
//       this.alertMessage = 'Signup successful!';
//       console.log(this.alertMessage);
//       setTimeout(() => {
//         this.alertMessage = null;
//       }, 5000); // Set timeout for 5 seconds
//           const userId = response['userId'];
//           this.router.navigate(['/welcome'], { queryParams: { userId,successMessage: 'Successfully Signed In!' } })
//             .then(() => {
//               if (this.dialogRef) {
//                 this.dialogRef.close();
//               }
//             });
//             setTimeout(() => {
//               this.alertMessage = null;
//             }, 5000);
//         }
//         error => {
//           console.error('Subscription error:', error);
//         }
//       });
//   }

//   private setServerErrors(errors: any): void {
//     Object.keys(this.signupForm.controls).forEach(field => {
//       const control = this.signupForm.get(field);
//       if (control) {
//         if (control.errors) {
//           // Preserve existing client-side errors if any
//           const currentErrors = { ...control.errors };
//           control.setErrors({ ...currentErrors, serverError: errors[field] });
//         } else {
//           control.setErrors({ serverError: errors[field] });
//         }
//       }
//     });
//   }
// }
// src/app/components/signup-popup/signup-popup.component.tsimport { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrls: ['./signup-popup.component.css']
})
export class SignupPopupComponent implements OnInit {
  signupForm: FormGroup;
  countries: any[] = [];
  alertMessage: string;
  errorMessage: string;

  private apiEndpoint = 'http://localhost:8080/user';
  private countriesApiEndpoint = 'http://localhost:8080/api/countries';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public dialogRef: MatDialogRef<SignupPopupComponent>
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.http.get<any[]>(this.countriesApiEndpoint)
      .pipe(catchError(error => {
        console.error('Error fetching countries:', error);
        return of([]);
      }))
      .subscribe(response => {
        this.countries = response;
      });
  }

  createAccount(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAsTouched();
      return;
    }

    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    const signupData = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      phoneNumber: this.signupForm.value.phoneNumber,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword,
      countryId: this.signupForm.value.country,
      pincode: this.signupForm.value.pincode
    };

    this.http.post<any>(this.apiEndpoint, signupData)
      .pipe(
        catchError(error => {
          console.error('Signup error:', error);
          if (error.status === 400 && error.error) {
            this.setServerErrors(error.error);
          } else if (error.status === 500) {
            this.router.navigate(['/error']);
            this.dialogRef.close();
          }
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.alertMessage = 'Signup successful!';
          setTimeout(() => { this.alertMessage = null; }, 5000);

          const userId = response['userId'];
          this.dialogRef.close();
this.router.navigate(['/login']);

            
        }
      });
  }

  private setServerErrors(errors: any): void {
    Object.keys(this.signupForm.controls).forEach(field => {
      const control = this.signupForm.get(field);
      if (control && errors[field]) {
        control.setErrors({ serverError: errors[field] });
      }
    });
  }

  clearAlertMessages() {
    this.alertMessage = null;
  }

  clearErrorMessages() {
    this.errorMessage = null;
  }
}
