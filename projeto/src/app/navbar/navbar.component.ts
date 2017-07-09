import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AddSemesterComponent } from '../semesters/add-semester/add-semester.component';
import { AddCourseComponent } from '../courses/add-course/add-course.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  semesters: string[];

  constructor(
      public dialog: MdDialog,
      private FBservice: FirebaseService
  ) { }

  ngOnInit() {
      this.FBservice.getSemestersIds().subscribe(semesters => {
          this.semesters = semesters;
      });
  }

  openDialog() {
      let dialogRef = this.dialog.open(AddSemesterComponent);
    dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
    });
  }

}
