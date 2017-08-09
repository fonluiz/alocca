import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  id;
  code: string;
  name;
  shortName;
  credits: number;
  hoursToSchedule: number;
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
    private snackService: SnackbarService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'],
    this.FBservice.getCourseDetails(this.id).subscribe(course =>{
        this.code = course.code;
        this.name = course.name;
        this.shortName = course.shortName;
        this.credits = course.credits;
        this.hoursToSchedule = course.hoursToSchedule;
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
          requesterDepartment: this.requesterDepartment
    }

    let savedSuccessfully: boolean = this.FBservice.updateCourse(this.id, course);

    if (savedSuccessfully) {
        this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_SAVED_MESSAGE);
    } else {
      this.snackService.openSnackBar(this.NOT_SAVED_MESSAGE,this.TIMEOUT_NOT_SAVED_MESSAGE);
    }

    this.router.navigate(['/view-courses']);

  }
}
