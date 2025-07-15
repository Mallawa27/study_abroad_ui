import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedApplicationSubject = new BehaviorSubject<any>(null);
  selectedApplication$ = this.selectedApplicationSubject.asObservable();

  setSelectedApplication(application: any): void {
    this.selectedApplicationSubject.next(application);
  }
}