import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  SAVED_SUCCESSFULLY_MESSAGE: string = "Turma salva com sucesso!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao cadastrar a turma. Verifique se a turma já foi alocada.";
  TIMEOUT_SAVED_MESSAGE = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE = 5000;
  coursesList: any[];
  courseName: any;
  note: string = "";
  classesNumber: number;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.FBservice.getCourses().subscribe(courses =>{
      this.coursesList = courses;
    });
  }

  onAddNewClass(){
    let newClass: any;

    for (var i = 1; i < this.classesNumber+1; i++){
        newClass = {
          classKey: this.courseName + i,
          courseName: this.courseName,
          classNumber: i
        }
        this.FBservice.addClass(newClass);
    }
    this.courseName = null;
    this.classesNumber = null;
  }

}
