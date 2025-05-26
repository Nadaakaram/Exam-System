import { Component } from '@angular/core';
import { CreateQuizComponent } from "../create-quiz/create-quiz.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [CreateQuizComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
