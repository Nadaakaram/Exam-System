import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { QuizComponent } from './pages/quiz/quiz.component';

import { ExamsComponent } from './pages/exams/exams.component';
import { StudentsComponent } from './pages/students/students.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SDashboardComponent } from './components/s-dashboard/s-dashboard.component';
import { SResultsComponent } from './components/s-results/s-results.component';

import { ResultComponent} from './pages/result/result.component';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CanExitGuard } from './guards/can-exit.guard';




export const routes: Routes = [
  {path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },


  // { path: 'student-dashboard', component: StudentDashboardComponent },
  // { path: 'admin-dashboard', component: AdminDashboardComponent },
  // { path: 'create-quiz', component: CreateQuizComponent },
  // { path: 'quiz/:id', component: QuizComponent },


  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: 'prize-quizzes/create', component: CreateQuizComponent },
  // { path: 'exams', component: ExamsComponent },
  // { path: 'students', component: StudentsComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'sDashboard', component: SDashboardComponent },
  // { path: 'sResults', component: SResultsComponent },

  // { path: '', component: StudentDashboardComponent },
  // { path: 'result', component: ResultComponent },
  // { path: '**', redirectTo: '' },

//   {
//   path: 'quiz/:id',
//   component: QuizComponent,
//   canActivate: [AuthGuard],
//   canDeactivate: [CanExitGuard]
// },
// {
//   path: 'student-dashboard',
//   component: StudentDashboardComponent,
//   canActivate: [AuthGuard]
// },
// {
//   path: 'admin-dashboard',
//   component: AdminDashboardComponent,
//   canActivate: [AuthGuard, RoleGuard]
// }

{
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanExitGuard]
  },
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [AuthGuard]
  },




  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'create-quiz',
    component: CreateQuizComponent,
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'prize-quizzes/create',
    component: CreateQuizComponent,
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'exams',
    component: ExamsComponent,
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [AuthGuard, RoleGuard]
  },



   {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sDashboard',
    component: SDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sResults',
    component: SResultsComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: '/register' }


];

