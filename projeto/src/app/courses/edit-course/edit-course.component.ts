import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  id;
  name;
  credits;
  type;
  recomendedSemester;
  offererDepartment;
  requesterDepartment;
  courseTypes = [ "Complementar", "Eletiva", "Obrigatória", "Optativa" ];
  semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  departments = ["UASC", "Outro"];

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'],
    this.FBservice.getCourseDetails(this.id).subscribe(course =>{
        this.name = course.name;
        this.credits = course.credits;
        this.type = course.type;
        this.recomendedSemester = course.recomendedSemester;
        this.offererDepartment = course.offererDepartment;
        this.requesterDepartment = course.requesterDepartment;

    });
  }

  onEditCourse(){
    let course = {
          id: this.id,
          name: this.name,
          credits: this.credits,
          type: this.type,
          recomendedSemester: this.recomendedSemester,
          offererDepartment: this.offererDepartment,
          requesterDepartment: this.requesterDepartment
    }

    this.FBservice.updateCourse(this.id, course);
    this.router.navigate(['/view-courses']);

  }
}
