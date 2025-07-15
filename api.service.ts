import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  serverUrl = environment.serverUrl;

;
  constructor(private http: HttpClient) { }

  customerloginauthentication(email, password) {
    const data = { 'email': email, 'password': password };
    const body = JSON.stringify(data);
    const reqHeader = new HttpHeaders({ 'content-Type': 'application/json', 'no-auth': 'True' });
    this.http.post('http://13.127.238.210:8091/api/auth/login', body, { headers: reqHeader });


  }
  getCustomerProfile(customerId) {
    let accessKey = '';
    if(sessionStorage.getItem('accessToken') &&  window.atob(localStorage.getItem('userRoles')) !== 'AFFINITY'){
      accessKey = sessionStorage.getItem('accessToken')
    }
    const params = new HttpParams().set('accessKey', accessKey);
    return this.http.get(this.serverUrl + 'customer/' + customerId , { params});
  }

  getVendorProfile(vendorId) {
    let accessKey = '';
     if(sessionStorage.getItem('accessToken') &&  window.atob(localStorage.getItem('userRoles')) !== 'AFFINITY'){
       accessKey = sessionStorage.getItem('accessToken')
     }
     const params = new HttpParams().set('accessKey', accessKey);
     return this.http.get(this.serverUrl + 'vendor/' + vendorId + '/profile' , { params});
   }

   getCommonPartnerDashboard(userID) {
    return this.http.get(this.serverUrl + 'user/' + userID + '/commonDashboard/userGroup', { headers:this.headers });
  }
}
