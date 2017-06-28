import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseService } from '../../services/firebase.service';
import { Professor } from '../professor.model';
import { HORARIOS } from '../professor.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.css']
})
export class AddProfessorComponent implements OnInit {
  nome: any;
  SIAP: any;
  horarios: string[] = HORARIOS;
  SAVED_SUCCESSFULLY_MESSAGE: string = "Professor salvo com sucesso!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao cadastrar o professor. Verifique se este já está cadastrado.";
  TIMEOUT_SAVED_MESSAGE = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService
  ) {
  }

  onAddNewProfessor(){
    let professor = {
    nome: this.nome,
    SIAP: this.SIAP
  }
    
    let savedSuccessfully: boolean = this.FBservice.addNewProfessor(professor);
    //para a area de cadastro oou para o view?

    this.nome = null;
    this.SIAP = null;

    // Queria colocar essa verificação em um método. Será que isso é possível?
    if (savedSuccessfully) {
        this._flashMessagesService.show(this.SAVED_SUCCESSFULLY_MESSAGE, { cssClass: 'alert-success', timeout: this.TIMEOUT_SAVED_MESSAGE });
    } else {
        this._flashMessagesService.show(this.NOT_SAVED_MESSAGE, { cssClass: 'alert-danger', timeout: this.TIMEOUT_NOT_SAVED_MESSAGE });
    }
    
    this.router.navigate(['/add-professor']);
  }

  
  ngOnInit() {
  }
}
