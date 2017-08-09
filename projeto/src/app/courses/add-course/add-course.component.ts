import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { SnackbarsService } from '../../services/snackbars.service';
import { Course } from '../course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  code: string;
  name: string;
  shortName: string;
  credits: number;
  hoursToSchedule: number;
  type: string;
  minimumSemester: number;
  maximumSemester: number;
  offererDepartment: string;
  requesterDepartment: String;
  classesNumber: number = 0;
  courseTypes: string[] = [ "Complementar", "Eletiva", "Obrigatória", "Optativa" ];
  semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  departments: string[] = ["UASC", "Outro"];
  SAVED_SUCCESSFULLY_MESSAGE: string = "Disciplina salva com sucesso!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao cadastrar a disciplina. Verifique se esta já está cadastrada.";
  TIMEOUT_SAVED_MESSAGE: number = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private snackService: SnackbarsService
  ) {  }

  onAddNewCourse(){
    if (this.credits===0){
      this.hoursToSchedule = 2;
    }else{
      this.hoursToSchedule = this.credits;
    }

    let course = {
      code: this.code,
      name: this.name,
      shortName: this.shortName,
      credits: this.credits,
      hoursToSchedule: this.hoursToSchedule,
      type: this.type,
      minimumSemester: this.minimumSemester,
      maximumSemester: this.maximumSemester,
      offererDepartment: this.offererDepartment,
      requesterDepartment: this.requesterDepartment,
      classesNumber: this.classesNumber
    }

    let savedSuccessfully: boolean = this.FBservice.addNewCourse(course);

    this.code = null;
    this.name = null;
    this.shortName = null;
    this.credits = null;
    this.type = null;
    this.minimumSemester = null;
    this.maximumSemester = null;
    this.offererDepartment = null;
    this.requesterDepartment = null;

    if (savedSuccessfully) {
       this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_SAVED_MESSAGE);
    } else {
        this.snackService.openSnackBar(this.NOT_SAVED_MESSAGE,this.TIMEOUT_NOT_SAVED_MESSAGE);
    }
  }

  ngOnInit() {
    let initiateCourses: any[];
    this.FBservice.getCourses().subscribe(courses =>{
      initiateCourses = courses;
    });
  }

}