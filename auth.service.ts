import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.serverUrl; // Example: 'http://localhost:8080'

  constructor(private http: HttpClient) {}

  registerUser(signupData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, signupData);
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, loginData);
  }
}
