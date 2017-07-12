/**
 * @api {component} projeto/src/app/courses/edit-course/edit-course.component.ts Edit Course Component
 * @apiName Edit Course Component
 * @apiGroup Course
 */

import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
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
  minimumSemester;
  maximumSemester;
  offererDepartment;
  requesterDepartment;
  courseTypes = [ "Complementar", "Eletiva", "Obrigatória", "Optativa" ];
  semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  departments = ["UASC", "Outro"];
  SAVED_SUCCESSFULLY_MESSAGE: string = "Disciplina editada com sucesso!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao editar a disciplina. Verifique se esta já está cadastrada.";
  TIMEOUT_SAVED_MESSAGE = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'],
    this.FBservice.getCourseDetails(this.id).subscribe(course =>{
        this.name = course.name;
        this.credits = course.credits;
        this.type = course.type;
        this.minimumSemester = course.minimumSemester;
        this.maximumSemester = course.maximumSemester;
        this.offererDepartment = course.offererDepartment;
        this.requesterDepartment = course.requesterDepartment;
    });
    let initiateCourses: any[];
    this.FBservice.getCourses().subscribe(courses =>{
      initiateCourses = courses;
    });
  }

  onEditCourse(){
    let course = {
          name: this.name,
          credits: this.credits,
          type: this.type,
          minimumSemester: this.minimumSemester,
          maximumSemester: this.maximumSemester,
          offererDepartment: this.offererDepartment,
          requesterDepartment: this.requesterDepartment
    }

    let savedSuccessfully: boolean = this.FBservice.updateCourse(this.id, course);

    if (savedSuccessfully) {
        this._flashMessagesService.show(this.SAVED_SUCCESSFULLY_MESSAGE, { cssClass: 'alert-success', timeout: this.TIMEOUT_SAVED_MESSAGE });
    } else {
        this._flashMessagesService.show(this.NOT_SAVED_MESSAGE, { cssClass: 'alert-danger', timeout: this.TIMEOUT_NOT_SAVED_MESSAGE });
    }

    this.router.navigate(['/view-courses']);

  }
}
