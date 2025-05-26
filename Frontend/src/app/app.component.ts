import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import { StudentDashboardComponent } from "./pages/student-dashboard/student-dashboard.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quiz-app';
}
