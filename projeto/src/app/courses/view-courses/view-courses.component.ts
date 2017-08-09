import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Course } from '../course.model';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { DialogsService } from '../../services/dialogs.service';
import { SnackbarsService } from '../../services/snackbars.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {
  courses: any;
  id: string;
  public result: any;
  DELETED_MESSAGE: string = "Disicplina deletada com sucesso!";
  NOT_DELETED_MESSAGE: string = "Não foi possível remover a disciplina. Tente novamente!";
  TIMEOUT_DELETED_MESSAGE: number = 2500;
  TIMEOUT_NOT_DELETED_MESSAGE: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private snackService: SnackbarsService,
    private dialogsService: DialogsService
  ) { }

  ngOnInit() {
    this.FBservice.getCourses().subscribe(courses =>{
      this.courses = courses;
    });
  }

  onDeleteCourse(id, courseName){
    var title = "Excluir Disciplina";
    var message = "Deseja realmente excluir a disciplina "+courseName+" ?";
    this.dialogsService
      .confirm(title, message)
      .subscribe(res => {
        if (res) {
          if(this.FBservice.deleteCourse(id)){
            this.snackService.openSnackBar(this.DELETED_MESSAGE,this.TIMEOUT_DELETED_MESSAGE);
          }else{
            this.snackService.openSnackBar(this.NOT_DELETED_MESSAGE,this.TIMEOUT_NOT_DELETED_MESSAGE);
          }
        }
      });
  }
}
