import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CommonDashboardComponent } from './components/common-dashboard/common-dashboard.component';
import { SignupPopupComponent } from './components/sign-up/signup-popup.component';
import { WelcomeModule } from './components/welcome/welcome.module';
import { ApiService } from './services/api.service';
import { AuthGuard } from './services/auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ErrorComponent } from './components/error/error.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { AddressDetailsComponent } from './components/address-details/address-details.component';
import { EducationDetailsComponent } from './components/education-details/education-details.component';
import { ExperienceDetailsComponent } from './components/experience-details/experience-details.component';
import { LanguageCertificationDetailsComponent } from './components/language-certification-details/language-certification-details.component';
import { ApplicationListingComponent } from './components/application-listing/application-listing.component';
import { ApplicationActionsDialogComponent } from './components/application-actions-dialog/application-actions-dialog.component';
import { CompetencyAchievementComponent } from './components/competency-achievement/competency-achievement.component';
import { BasicDetailsComponent } from './components/basic-details/basic-details.component';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';
import { CountrySelectionComponent } from './components/user-country-selection/country-selection.component';
import { NewStudentDashboardComponent } from './components/new-student-dashboard/new-student-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UniversityListComponent } from './components/user-university-list/university-list.component';
import { TestScoresComponent } from './components/test-scores/test-scores.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { CountryComponent } from './components/studyabroadexplorer/country.component';
import { CountryDetailComponent } from './components/studyabroadexplorer/countrydetail.component';
import { UniComponent } from './components/studyabroadexplorer/university.component';
import { UniversityDetailComponent } from './components/studyabroadexplorer/universitydetail.component';
import { CourseComponent } from './components/studyabroadexplorer/course.component';
import { CourseDetailComponent } from './components/studyabroadexplorer/coursedetail.component';
import { CourseService } from './components/studyabroadexplorer/course.service';
import { UniversityService } from './components/studyabroadexplorer/university.service';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { RecommendationService } from './services/recommendation.service';
import { OptionsComponent } from './components/options/options.component';
import { CourseRecommendationComponent } from './components/course-recommendation/course-recommendation.component';
import { RecommendationOptionsComponent } from './components/recommendation-options/recommendation-options.component';
import { CountryQuestionFormComponent } from './components/country-question-form/country-question-form.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CommonDashboardComponent,
    SignupPopupComponent,
    ErrorComponent,
    ApplicationFormComponent,
    AddressDetailsComponent,
    EducationDetailsComponent,
    ExperienceDetailsComponent,
    LanguageCertificationDetailsComponent,
    ApplicationListingComponent,
    ApplicationActionsDialogComponent,
    CompetencyAchievementComponent,
    BasicDetailsComponent,
    MedicalRecordsComponent,
    CountrySelectionComponent,
    NewStudentDashboardComponent,
    SidebarComponent,
    UniversityListComponent,
    TestScoresComponent,
    DocumentationComponent,
    CountryComponent,
    CountryDetailComponent,
    UniComponent,
    UniversityDetailComponent,
    CourseComponent,
    CourseDetailComponent,
    QuestionFormComponent,
    OptionsComponent,
    CourseRecommendationComponent,
    CountryQuestionFormComponent,
    RecommendationOptionsComponent,
    
  ],
  entryComponents: [
    ApplicationActionsDialogComponent,
    LoginComponent,
    SignupPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatStepperModule,
    HttpClientModule,
    MatCheckboxModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      enableHtml: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 3000,
    }),
    WelcomeModule
  ],
  providers: [ApiService, AuthGuard, ToastrService, CourseService, UniversityService,RecommendationService],
  bootstrap: [AppComponent],
  exports: [SidebarComponent]
})
export class AppModule {}