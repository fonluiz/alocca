import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

import { NavbarService } from './services/navbar.service';
import { SnackbarService } from './services/snackbar.service';
import { FirebaseService } from './services/firebase.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { User } from './users/user.model';

const TIMEOUT_NOT_REGISTERED: number = 5000;
const NOT_REGISTERED_MESSAGE: string = "Opa! Parece que você não está cadastrado. Entre em contato com o administrador.";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;

  constructor(
    public FBservice: FirebaseService,
    public dbAuth: AngularFireAuth,
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
    private snackService: SnackbarService) {
    this.user = dbAuth.authState;
  }
  ngOnInit(){
    var initiateEmails: any[];
    this.FBservice.getUsersEmails().subscribe(emails =>{
      initiateEmails = emails;
    });
  }

  login(){
    this.dbAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      var userEmail: String = this.dbAuth.auth.currentUser.email;
      //pegar UID do usuário
      var isRegistered: boolean = this.FBservice.isUserRegistered(userEmail);
      if(!isRegistered){
        if(this.logout()){
          this.snackService.openSnackBar(NOT_REGISTERED_MESSAGE, TIMEOUT_NOT_REGISTERED);
        }
      }
    });

  }

  logout() {
    this.dbAuth.auth.signOut();
    return true;
  }
}