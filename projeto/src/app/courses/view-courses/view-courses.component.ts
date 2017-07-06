import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Course } from '../course.model';
import { Router, ActivatedRoute,Params } from '@angular/router';
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

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
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
          this.FBservice.deleteCourse(id, courseName)
        }
      });
  }

  public openDialog() {
    this.dialogsService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')
      .subscribe(res => this.result = res);
  }
}
