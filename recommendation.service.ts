import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


interface RecommendationResponse {
  aspirationalUniversities: string[];
  alignedUniversities: string[];
  safeBetUniversities: string[];
}

interface CourseRecommendationResponse {
  courses: string[];
}

interface CountryRecommendationResponse {
  recommended_countries: string[];
}

interface UserAnswers {
  previousField: string;
  gpa: number;
  tuitionFee: number;
  languageTest: string;
  scholarship: string;
  courseRequirements: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private baseApiUrl = 'http://localhost:8080/api/recommendations';
  private universityApiUrl = `${this.baseApiUrl}/universities`;
  private courseApiUrl = `${this.baseApiUrl}/courses`;
  private countryApiUrl = `${this.baseApiUrl}/countries`;

  constructor(private http: HttpClient) {}

  getRecommendations(userAnswers: any): Observable<RecommendationResponse> {
    return this.http.post<RecommendationResponse>(this.universityApiUrl, userAnswers).pipe(
      catchError(this.handleError)
    );
  }

  getCourseRecommendations(userAnswers: UserAnswers): Observable<CourseRecommendationResponse> {
    return this.http.post<CourseRecommendationResponse>(this.courseApiUrl, userAnswers).pipe(
      catchError(this.handleError)
    );
  }

   // ✅ Country Recommendation
  getCountryRecommendations(userAnswers: any): Observable<{ recommended_countries: string[] }> {
    return this.http.post<{ recommended_countries: string[] }>(`${this.baseApiUrl}/countries`, userAnswers).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error.error || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
