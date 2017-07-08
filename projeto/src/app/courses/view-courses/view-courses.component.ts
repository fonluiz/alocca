import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Course } from '../course.model';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DialogsService } from '../../services/dialogs.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {
  courses: any
  id: any;
  public result: any;
  DELETED_MESSAGE: string = "Disicplina deletada com sucesso!";
  TIMEOUT_DELETED_MESSAGE = 2500;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private dialogsService: DialogsService
  ) { }

  ngOnInit() {
    this.FBservice.getCourses().subscribe(courses =>{
      this.courses = courses;
    });
  }

  onDeleteCourse(id, courseName){
    var title = "Excluir Disciplina";
    var message = "Deseja realmente excluir a disciplina "+courseName+" e todas as suas alocações?";
    this.dialogsService
      .confirm(title, message)
      .subscribe(res => {
        if (res) {
          this.FBservice.deleteCourse(id);
          this._flashMessagesService.show(this.DELETED_MESSAGE, { cssClass: 'alert-success', timeout: this.TIMEOUT_DELETED_MESSAGE });
          this.router.navigate(['/view-courses']);
        }
      });
  }
}
