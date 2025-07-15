import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonHelper } from '../../services/commonHelper';

import { MatDialog } from '@angular/material/dialog';  
import { SignupPopupComponent } from '../../components/sign-up/signup-popup.component';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private commonHelper: CommonHelper,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [    // 👉 FIXED: Should be 'email'
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [  // 👉 FIXED: Should be 'password'
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ])
    });
  }

  emailError() {
    const emailControl = this.loginForm.get('email');
    return emailControl.hasError('required') ? 'Field is required' :
           emailControl.hasError('email') ? 'Invalid email address' : '';
  }

  passwordError() {
    const passwordControl = this.loginForm.get('password');
    return passwordControl.hasError('required') ? 'Field is required' :
           passwordControl.hasError('minlength') ? 'Minimum 6 characters' :
           passwordControl.hasError('maxlength') ? 'Maximum 15 characters' : '';
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      email: this.loginForm.value.email,    // ✅ No mapping needed if form has correct fields
      password: this.loginForm.value.password
    };

    this.authService.loginUser(loginData).subscribe({
      next: (data: any) => {
        localStorage.setItem('userId', data.userId.toString()); // 👈 Important fix
        localStorage.setItem('userToken', window.btoa(data.userId.toString())); // Optional
        localStorage.setItem('userRoles', window.btoa(data.userRoleGroup));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.commonHelper.handleError(err);
        this.loginError = 'Invalid login credentials. Please try again.';
      }
    });
  }

  openSignupPopup(): void {
    this.dialog.open(SignupPopupComponent, {
      width: '400px'
    });
  }
}
