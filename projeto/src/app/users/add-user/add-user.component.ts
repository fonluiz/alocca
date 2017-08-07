import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

const SAVED_SUCCESSFULLY_MESSAGE: string = "Usuário cadastrado com sucesso!";
const NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao cadastrar o usuário. Verifique se o usuário já foi cadastrado.";
const TIMEOUT_SAVED_MESSAGE: number = 2500;
const TIMEOUT_NOT_SAVED_MESSAGE: number = 5000;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  // should be private, but if so, maybe it won't work correctly.
  email: string;
  name: string;
  SIAPE: string;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private snackService: SnackbarService
  ) {
  }

  onAddNewUser(){
    let user = {
      SIAPE: this.SIAPE,
      email: this.email,
      name: this.name
    }

    let savedSuccessfully: boolean = this.FBservice.addNewUser(user);
    this.SIAPE = null;
    this.email = null;
    this.name = null;

    if(savedSuccessfully){
        this.snackService.openSnackBar(SAVED_SUCCESSFULLY_MESSAGE, TIMEOUT_SAVED_MESSAGE);
    }
    else{
        this.snackService.openSnackBar(NOT_SAVED_MESSAGE, TIMEOUT_NOT_SAVED_MESSAGE);
    }    
    this.router.navigate(['/add-user']);
  }

  ngOnInit() {
    let initiateUsers: User[];
    this.FBservice.getUsers().subscribe(users =>{
      initiateUsers = users;
    });
  }
}
