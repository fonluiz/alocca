import { Component, OnInit } from '@angular/core';
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

  constructor(
    private FBservice: FirebaseService,
    private router: Router
  ) {
  }

  onAddNewProfessor(){
    let professor = {
    nome: this.nome,
    SIAP: this.SIAP
  }
    
    this.FBservice.addNewProfessor(professor);
    //para a area de cadastro oou para o view?
    this.router.navigate(['/add-professor']);
  }
  
  ngOnInit() {
  }

}
