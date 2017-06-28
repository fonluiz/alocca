import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
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
  DELETED_MESSAGE: string = "Professor deletado com sucesso!";
  TIMEOUT_DELETED_MESSAGE = 2500;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService
  ){    }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'],
    this.FBservice.getProfessorDetails(this.id).subscribe(professor =>{
        this.nome = professor.nome;
        this.SIAP = professor.SIAP;
    });
  }

  onEditProfessor(){
    let professor = {
          nome: this.nome,
          SIAP: this.SIAP,
          max_creditos: this.max_creditos,
          min_creditos: this.min_creditos,
          creditos_pos: this.creditos_pos,
          id: this.id
    }
        
    this.FBservice.updateProfessor(this.id, professor);
    console.log(professor);
    this.router.navigate(['view-professors']);

  }
   onDeleteClick(){
       this.FBservice.deleteProfessor(this.id);
       this._flashMessagesService.show(this.DELETED_MESSAGE, { cssClass: 'alert-success', timeout: this.TIMEOUT_DELETED_MESSAGE });
    this.router.navigate(['/view-professors']);
  }
}
