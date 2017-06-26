import { Component, OnInit } from '@angular/core';
import { Professor } from '../professor.model';
import { HORARIOS } from '../professor.mock';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent implements OnInit {
  nome;
  SIAP;
  max_creditos;
  min_creditos;
  creditos_pos;
  great;
  restricoes_horarios;
  id;
  horarios: string[] = HORARIOS;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ){    }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'],
    this.FBservice.getProfessorDetails(this.id).subscribe(professor =>{
        this.nome = professor.nome;
        this.SIAP = professor.SIAP;
        this.max_creditos = professor.max_creditos;
        this.min_creditos = professor.min_creditos;
        this.creditos_pos = professor.creditos_pos;
        //this.restricoes_horarios = professor.restricoes_horarios;

    });
  }

  onEditProfessor(){
    let professor = {
          nome: this.nome,
          SIAP: this.SIAP,
          max_creditos: this.max_creditos,
          min_creditos: this.min_creditos,
          creditos_pos: this.creditos_pos,
          //restricoes_horarios: this.restricoes_horarios,
          id: this.id
    }
        
    this.FBservice.updateProfessor(this.id, professor);
    console.log(professor);
    this.router.navigate(['view-professors']);

  }
}
