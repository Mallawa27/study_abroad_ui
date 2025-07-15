import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupPopupComponent } from './components/sign-up/signup-popup.component';
import { CommonDashboardComponent } from './components/common-dashboard/common-dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorComponent } from './components/error/error.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { EducationDetailsComponent } from './components/education-details/education-details.component';
import { ExperienceDetailsComponent } from './components/experience-details/experience-details.component';
import { LanguageCertificationDetailsComponent } from './components/language-certification-details/language-certification-details.component';
import { ApplicationListingComponent } from './components/application-listing/application-listing.component';
import { ApplicationActionsDialogComponent } from './components/application-actions-dialog/application-actions-dialog.component';
import { CompetencyAchievementComponent } from './components/competency-achievement/competency-achievement.component';
import { BasicDetailsComponent } from './components/basic-details/basic-details.component';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';
import { CountrySelectionComponent } from './components/user-country-selection/country-selection.component';
import { UniversityListComponent } from './components/user-university-list/university-list.component';
import { NewStudentDashboardComponent } from './components/new-student-dashboard/new-student-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TestScoresComponent } from './components/test-scores/test-scores.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { CountryComponent } from './components/studyabroadexplorer/country.component';
import { CountryDetailComponent } from './components/studyabroadexplorer/countrydetail.component';
import { UniComponent } from './components/studyabroadexplorer/university.component';
import { UniversityDetailComponent } from './components/studyabroadexplorer/universitydetail.component';
import { CourseComponent } from './components/studyabroadexplorer/course.component';
import { CourseDetailComponent } from './components/studyabroadexplorer/coursedetail.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { RecommendationService } from './services/recommendation.service';
import { OptionsComponent } from './components/options/options.component';
import { CourseRecommendationComponent } from './components/course-recommendation/course-recommendation.component';
import { RecommendationOptionsComponent } from './components/recommendation-options/recommendation-options.component';
import { CountryQuestionFormComponent } from './components/country-question-form/country-question-form.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupPopupComponent },
  { path: 'dashboard', component: NewStudentDashboardComponent },
  { path: 'common-dashboard', component: CommonDashboardComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'application-form', component: ApplicationFormComponent },
  { path: 'education-details', component: EducationDetailsComponent },
  { path: 'experience-details', component: ExperienceDetailsComponent },
  { path: 'language-certification-details', component: LanguageCertificationDetailsComponent },
  { path: 'application-listing', component: ApplicationListingComponent },
  { path: 'application-actions-dialog', component: ApplicationActionsDialogComponent },
  { path: 'competency-achievement', component: CompetencyAchievementComponent },
  { path: 'basic-details', component: BasicDetailsComponent },
  { path: 'medical-records', component: MedicalRecordsComponent },
  { path: 'country-selection', component: CountrySelectionComponent },
  { path: 'university-list', component: UniversityListComponent },
  { path: 'test-scores', component: TestScoresComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'new-student-dashboard', component: NewStudentDashboardComponent }, 
  { path: 'course-recommendation', component: CourseRecommendationComponent},
  { path: 'country-question-form', component: CountryQuestionFormComponent},
  { path: 'recommendation-options', component: RecommendationOptionsComponent },
  { path: '', component: OptionsComponent }, // Default route
  { path: 'question-form', component: QuestionFormComponent },
  //{ path: '**', redirectTo: '' }, // Redirect unknown routes to the default
  {
    path: 'studyabroadexplorer',
    children: [
      { path: '', redirectTo: 'country', pathMatch: 'full' },
      { path: 'country', component: CountryComponent },
      { path: 'country/:country', component: CountryDetailComponent },
      { path: 'university', component: UniComponent },
      { path: 'university/:uniName', component: UniversityDetailComponent },
      { path: 'course', component: CourseComponent },
      { path: 'course/:courseName', component: CourseDetailComponent }
    ]
  },
  { path: "", redirectTo: "/error", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}