import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { NavbarService } from '../../services/navbar.service';
import { ClassesDmService } from '../../data-manager/classes/classes-dm.service'
import { CoursesDmService } from '../../data-manager/courses/courses-dm.service'


import { Class } from '../class.model'
import { Schedule } from '../schedule.model'

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  SAVED_SUCCESSFULLY_MESSAGE: string = "Novas turmas criadas!";
  NOT_SAVED_MESSAGE: string = "Erro ao salvar. Verifique se a turma já foi cadastrada.";
  MESSAGES_TIME = 4000;
  coursesList: any[];
  courseKey: string;
  classesNumber: number;
  NO_SEMESTER_SELECTED: string = "Selecione um semestre ou crie um novo";
  TIMEOUT_NO_SEMESTER_SELECTED = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private snackService: SnackbarService,
    private classesDM: ClassesDmService,
    private coursesDM: CoursesDmService,
    private navbarService: NavbarService
    ) {
      this.navbarService.getSemesterSelectedEmitter().subscribe(
        semester => {this.classesDM.setSemester(semester)}
      );
    }

  ngOnInit() {
    this.coursesDM.getCourses().subscribe(coursesnames =>{
      this.coursesList = coursesnames;
    });
  }
 
  saveNewClasses(){
    try {
      for (var _i = 1; _i <= this.classesNumber; _i++) {
        let newClass = new Class(this.courseKey, _i);
        this.classesDM.addNewClass(newClass);
      }
    } catch (error) {
      this.snackService.openSnackBar(this.NO_SEMESTER_SELECTED,this.TIMEOUT_NO_SEMESTER_SELECTED);
      console.log(error)
    }
  }
}
