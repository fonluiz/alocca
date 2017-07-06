import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
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
  minimumSemester: number;
  maximumSemester: number;
  offererDepartment: string;
  requesterDepartment: String;
  courseTypes = [ "Complementar", "Eletiva", "Obrigatória", "Optativa" ];
  semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  departments = ["UASC", "Outro"];
  SAVED_SUCCESSFULLY_MESSAGE: string = "Disciplina salva com sucesso!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao cadastrar a disciplina. Verifique se esta já está cadastrada.";
  TIMEOUT_SAVED_MESSAGE = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService
  ) {  }

  onAddNewCourse(){
    let course = {
      name: this.name,
      credits: this.credits,
      type: this.type,
      minimumSemester: this.minimumSemester,
      maximumSemester: this.maximumSemester,
      offererDepartment: this.offererDepartment,
      requesterDepartment: this.requesterDepartment,
    }

    let savedSuccessfully: boolean = this.FBservice.addNewCourse(course);

    this.name = null;
    this.credits = null;
    this.type = null;
    this.minimumSemester = null;
    this.maximumSemester = null;
    this.offererDepartment = null;
    this.requesterDepartment = null;

    if (savedSuccessfully) {
        this._flashMessagesService.show(this.SAVED_SUCCESSFULLY_MESSAGE, { cssClass: 'alert-success', timeout: this.TIMEOUT_SAVED_MESSAGE });
    } else {
        this._flashMessagesService.show(this.NOT_SAVED_MESSAGE, { cssClass: 'alert-danger', timeout: this.TIMEOUT_NOT_SAVED_MESSAGE });
    }

    this.router.navigate(['/view-courses']);
  }

  ngOnInit() {
  }

}