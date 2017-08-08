import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Professor } from '../professor.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.css']
})
export class AddProfessorComponent implements OnInit {
  name: any;
  nickname: any;
  SIAPE: any;
  SAVED_SUCCESSFULLY_MESSAGE: string = "Professor salvo com sucesso!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao cadastrar o professor. Verifique se este já está cadastrado.";
  TIMEOUT_SAVED_MESSAGE = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE = 8000;
  

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private snackService: SnackbarService
  ) {
  }

  onAddNewProfessor(){
    let professor = {
    name: this.name,
    nickname: this.nickname,
    SIAPE: this.SIAPE
  }
    
    let savedSuccessfully: boolean = this.FBservice.addNewProfessor(professor);

    this.name = null;
    this.nickname = null;
    this.SIAPE = null;

    // Queria colocar essa verificação em um método. Será que isso é possível?
    if (savedSuccessfully) {
        this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_SAVED_MESSAGE);
    } else {
        this.snackService.openSnackBar(this.NOT_SAVED_MESSAGE,this.TIMEOUT_NOT_SAVED_MESSAGE)
    }
  }

  
  ngOnInit() {
    let initiateProfessors: any[];
    this.FBservice.getProfessors().subscribe(professors =>{
      initiateProfessors = professors;
    });
  }
}