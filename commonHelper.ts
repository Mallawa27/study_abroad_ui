import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class CommonHelper {
  constructor(private toastr :  ToastrService){}
    public totalRequests = 0;
    handleError(err): String {
      if (err.error.errorMessage && !(err.status && (String(err.status).startsWith('5')) && String(err.status) != '502')) {
        this.toastr.error(err.error.errorMessage);
        return 'ERROR';
      } else {
        if (navigator.onLine) {
          this.toastr.error('We have encountered an issue while processing your request. Kindly try after sometime. If issue persists, please contact the customer support.');
          return 'SERVER_DOWN';
        } else {
          this.toastr.error('Please check your internet connectivity and try again.');
          return 'USER_NET_CONNECTIVITY';
        }
      }
    }
}