import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';

import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from './users/user.model';
import { NavbarService } from "app/navbar/navbar.service";

import { SnackbarsService } from './services/snackbars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  TIMEOUT_NOT_REGISTERED = 5000;
  NOT_REGISTERED_MESSAGE: string = "Opa! Parece que você não está cadastrado. Entre em contato com o administrador.";

  constructor(
    public FBservice: FirebaseService,
    public dbAuth: AngularFireAuth,
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
    private snackService: SnackbarsService) {
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
      //console.log(this.dbAuth.auth.currentUser.uid);
      console.log(userEmail);
      var isRegistered: boolean = this.FBservice.isUserRegistered(userEmail);
      console.log(isRegistered);
      if(isRegistered===false){
        if(this.logout()){
          console.log(userEmail);
          console.log('pegou o logout');
          //this._flashMessagesService.show(this.NOT_REGISTERED_MESSAGE, { cssClass: 'alert-danger', timeout: this.TIMEOUT_NOT_REGISTERED });
          this.snackService.openSnackBar(this.NOT_REGISTERED_MESSAGE,this.TIMEOUT_NOT_REGISTERED);
        }
      }
    });

  }

  logout() {
    this.dbAuth.auth.signOut();
    return true;
  }
}