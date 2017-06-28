import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Course } from '../course.model';
import { Router } from '@angular/router';

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

  constructor(
    private FBservice: FirebaseService,
    private router: Router
  ) {  }

  onAddNewCourse(){
    let course = {
      name: this.name,
      credits: this.credits,
      type: this.type,
      recomendedSemester: this.recomendedSemester,
      offererDepartment: this.offererDepartment,
      requesterDepartment: this.requesterDepartment,
    }
    this.FBservice.addNewCourse(course);
    this.router.navigate(['/view-courses']);
  }

  ngOnInit() {
  }

}
