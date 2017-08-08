import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { AddSemesterComponent } from '../semesters/add-semester/add-semester.component';
import { AddCourseComponent } from '../courses/add-course/add-course.component';
import { FirebaseService } from '../services/firebase.service';
import { NavbarService } from '../services/navbar.service';
import { Semester } from '../semesters/semester.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  semesters: Semester[];
  selectedSemesterID: string;
  user: Observable<firebase.User>;

  constructor(
    public dialog: MdDialog,
    private FBservice: FirebaseService,
    public db: AngularFireDatabase,
    public dbAuth: AngularFireAuth,
    private _flashMessagesService: FlashMessagesService,
    private navbarService: NavbarService,
    private router: Router) {
    this.user = dbAuth.authState
  }
  
  ngOnInit(){
    this.FBservice.getSemesters().subscribe(semesters => {
          this.semesters = semesters;
    });
  }

  openDialog() {
      let dialogRef = this.dialog.open(AddSemesterComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout(){
    this.dbAuth.auth.signOut();
  }

  emitSemesterSelected() {
      this.navbarService.emitSemesterSelected(this.selectedSemesterID);
      let currentPage = this.router.url;
      console.log(currentPage);
      this.router.navigate(['/home']).then(()=>{
        this.router.navigateByUrl(currentPage);
      });
  }
}
