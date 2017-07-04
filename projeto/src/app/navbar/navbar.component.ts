import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from '../users/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  TIMEOUT_NOT_REGISTERED = 5000;
  NOT_REGISTERED_MESSAGE: string = "Opa! Parece que você não está cadastrado. Entre em contato com o administrador.";

  constructor(
    public db: AngularFireDatabase,
    public dbAuth: AngularFireAuth,
    private _flashMessagesService: FlashMessagesService) {
    this.user = dbAuth.authState
  }
  ngOnInit(){

  }

  login(){
    this.dbAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() =>{
      var userEmail: String = this.dbAuth.auth.currentUser.email;
      console.log(userEmail);
      var usersList = this.db.list('/users') as FirebaseListObservable<User[]>;
      var isRegistered: Boolean = false;
      var executionOrder: Boolean = false;
      usersList.subscribe(users =>{
        users.forEach(usr => {
          executionOrder = true;
          console.log(executionOrder+'execution');
          if (usr.email === userEmail) {
            isRegistered = true;
            console.log('acchou o email');
          }
        });
        if(executionOrder){
        console.log('entrou');
        if(isRegistered===false){
          this.logout();
          console.log('pegou o logout');
          this._flashMessagesService.show(this.NOT_REGISTERED_MESSAGE, { cssClass: 'alert-danger', timeout: this.TIMEOUT_NOT_REGISTERED });
        }
      }
      });
    });

  }

  logout(){
    this.dbAuth.auth.signOut();
  }
}
