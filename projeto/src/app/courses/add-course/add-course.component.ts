import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  name: string;
  credits: string;
  type: string;
  recomendedSemester: number;
  offererDepartment: string;
  requesterDepartment: String;
  courseTypes = [ "Complementar", "Eletiva", "Obrigatória", "Optativa" ];
  semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  departments = ["UASC", "Outro"];
  
  constructor() { }

  ngOnInit() {
  }

}
