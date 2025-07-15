import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CommonHelper } from './commonHelper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public totalRequests = 0;
  constructor(private router: Router, private spinner: NgxSpinnerService, private commonHelper: CommonHelper) {
  }


  
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    var accessKey: string = ''
    var userToken = window.atob(localStorage.getItem('userToken'));
    if (!accessKey) {
      accessKey = '';
    } 
    if (req.headers.get('No-Auth') === 'True') {
        this.increaseRequests(req);
      const clonedreq = req.clone({
        headers: req.headers.set('accessKey', accessKey)
      })
      return next.handle(clonedreq)
        .pipe(
          tap(res => {
            if (res instanceof HttpResponse) {
              //                        console.log('decreasing count for req:: '+res.url);
              this.decreaseRequests(req);
            }
          }),
          catchError(err => {
            //                      console.log('decreasing count for error in req with no-auth');
            this.decreaseRequests(req);
            throw err;
          })
        );;
    } 

      
    if (localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != undefined) {

      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + window.atob(localStorage.getItem('userToken')))
          .set('userType', '').set('accessKey', accessKey).set('userId' , userToken)
      });
      //            this.commonHelper.totalRequests++;
      //            this.totalRequests++;
      //            this.spinner.show();
      this.increaseRequests(req);
      //            console.log('increasing count for req '+req.url);
      //            console.log('increased count::'+ this.totalRequests);
      return next.handle(clonedreq)
        .do(
          succ => { },
          err => {
            if (err.status === 401) {
              this.router.navigateByUrl('/login');
            } else if (err.status === 403) {
              this.router.navigateByUrl('/forbidden');
            }
          }
        )
        .pipe(
          tap(res => {
            if (res instanceof HttpResponse) {
              //                        console.log('decreasing count for req:: '+res.url);
              this.decreaseRequests(req);
            }
          }),
          catchError(err => {
            //                      console.log('decreasing count for error in req with Authorization');
            this.decreaseRequests(req);
            throw err;
          })
        );
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  private decreaseRequests(req: HttpRequest<any>) {
    if (req.headers.get('Lecture-File-Upload') !== 'true' && req.headers.get('reqType') !== 'AJAX') {
      this.totalRequests--;
      this.commonHelper.totalRequests--;
      if (this.commonHelper.totalRequests === 0) {
        //        console.log('decreased count:: '+this.totalRequests);
        //        console.log('hiding spinner');
        this.spinner.hide();
      }
    }
  }

  private increaseRequests(req: HttpRequest<any>) {
    if (req.headers.get('Lecture-File-Upload') !== 'true' && req.headers.get('reqType') !== 'AJAX') {
      this.totalRequests++;
      this.commonHelper.totalRequests++;
      this.spinner.show();
    }
  }
}
