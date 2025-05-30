import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Router, Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { SDashboardComponent } from "../../components/s-dashboard/s-dashboard.component";
import { ProfileComponent } from '../../components/profile/profile.component';
import { SResultsComponent } from "../../components/s-results/s-results.component";

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, SDashboardComponent, ProfileComponent, SResultsComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  searchText = '';
  quizzes: any[] = [];
  user: any = null;
selectedComponent: string = 'sdashboard';

onComponentChanged(component: string) {
  this.selectedComponent = component;
}
  constructor() {}

}




