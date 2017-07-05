import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  email: string;
  nome: string;
  SAVED_SUCCESSFULLY_MESSAGE: string = "Usuário solicitado com sucesso!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao cadastrar o usuário. Verifique se as senhas coincidem.";
  TIMEOUT_SAVED_MESSAGE = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService
  ) {
  }

  onAddNewUser(){
    let user = {
    email: this.email,
    nome: this.nome
  }

    this.email = null;
    this.nome = null;

    this.FBservice.addNewUser(user);

    this._flashMessagesService.show(this.SAVED_SUCCESSFULLY_MESSAGE, { cssClass: 'alert-success', timeout: this.TIMEOUT_SAVED_MESSAGE });
    
    this.router.navigate(['/add-user']);
  }



  ngOnInit() {
  }
}
