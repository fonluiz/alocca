import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { FirebaseService } from '../../services/firebase.service';
import { SnackbarsService } from '../../services/snackbars.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  id: string;
  name: string;
  shortName: string;
  credits: number;
  type: string;
  minimumSemester: number;
  maximumSemester: number;
  offererDepartment: string;
  requesterDepartment: string;
  courseTypes: string[] = [ "Complementar", "Eletiva", "Obrigatória", "Optativa" ];
  semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  departments: string[] = ["UASC", "Outro"];
  SAVED_SUCCESSFULLY_MESSAGE: string = "Disciplina editada com sucesso!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao editar a disciplina. Verifique se esta já está cadastrada.";
  TIMEOUT_SAVED_MESSAGE: number = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private snackService: SnackbarsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'],
    this.FBservice.getCourseDetails(this.id).subscribe(course =>{
        this.name = course.name;
        this.shortName = course.shortName;
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
          shortName: this.shortName,
          credits: this.credits,
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
