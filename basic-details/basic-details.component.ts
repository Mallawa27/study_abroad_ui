// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-basic-details',
//   templateUrl: './basic-details.component.html',
//   styleUrls: ['./basic-details.component.css']
// })
// export class BasicDetailsComponent implements OnInit {
//   basicDetailsForm: FormGroup;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.basicDetailsForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phoneNumber: ['', Validators.required],
//       gender: ['', Validators.required],
//       dob: ['', Validators.required],
//       guardianFirstName: ['', Validators.required],  // ✅ Make sure this exists
//       guardianLastName: ['', Validators.required],
//       guardianEmail: ['', [Validators.required, Validators.email]],
//       guardianPhoneNumber: ['', Validators.required],
//     });
//   }
// }
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent {
  @Input() formGroup: FormGroup;
}
