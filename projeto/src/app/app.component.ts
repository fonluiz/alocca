import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

import { SnackbarService } from './services/snackbar.service';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  /**
   * Current logged in user.
   */
  user: Observable<firebase.User>;
  /**
   * Message to display when user is not registered.
   */
  NOT_REGISTERED_MESSAGE: string = "Opa! Parece que você não está cadastrado. Entre em contato com o administrador.";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when user is not registered.
   */
  TIMEOUT_NOT_REGISTERED: number = 5000;
  
  constructor(
    public FBservice: FirebaseService,
    public dbAuth: AngularFireAuth,
    private snackService: SnackbarService)
    {
    this.user = dbAuth.authState;
    }

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit(){
    var initiateEmails: any[];
    this.FBservice.getUsersEmails().subscribe(emails =>{
      initiateEmails = emails;
    });
  }

  /**
   * Logs in if user is registered.
   */
  login(){
    this.dbAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(() => {
      var userEmail: String = this.dbAuth.auth.currentUser.email;
      var isRegistered: boolean = this.FBservice.isUserRegistered(userEmail);
      if(!isRegistered){
        if(this.logout()){
          this.snackService.openSnackBar(this.NOT_REGISTERED_MESSAGE, this.TIMEOUT_NOT_REGISTERED);
        }
      }
    });

  }

  /**
   * Logout method to make sure user does not log in if not registered.
   */
  private logout() {
    this.dbAuth.auth.signOut();
    return true;
  }
}