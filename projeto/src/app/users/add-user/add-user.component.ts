import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  email: string;
  name: string;
  SIAPE: string;
  SAVED_SUCCESSFULLY_MESSAGE: string = "Usuário cadastrado com sucesso!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao cadastrar o usuário. Verifique se o usuário já foi cadastrado.";
  TIMEOUT_SAVED_MESSAGE = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE = 5000;

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
    console.log(this.email);

    this.SIAPE = null;
    this.email = null;
    this.name = null;

    if(savedSuccessfully){
        this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE, this.TIMEOUT_SAVED_MESSAGE);
    }
    else{
        this.snackService.openSnackBar(this.NOT_SAVED_MESSAGE,this.TIMEOUT_NOT_SAVED_MESSAGE);
    }    
    this.router.navigate(['/add-user']);
  }



  ngOnInit() {
    let initiateUsers: any[];
    this.FBservice.getUsers().subscribe(users =>{
      initiateUsers = users;
    });
  }
}
