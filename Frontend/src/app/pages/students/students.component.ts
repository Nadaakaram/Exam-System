import { Component, OnInit } from '@angular/core';
import { Student, StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students',
  imports: [],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
   students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

}
