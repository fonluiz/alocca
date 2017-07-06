import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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
    private _flashMessagesService: FlashMessagesService,
    private router: Router) {
    this.user = dbAuth.authState
  }
  ngOnInit(){
  }


  logout(){
    this.dbAuth.auth.signOut();
  }
}
