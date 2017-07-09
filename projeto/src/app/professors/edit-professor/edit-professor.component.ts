import { Component, OnInit } from '@angular/core';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { Professor } from '../professor.model';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent implements OnInit {
  name;
  SIAP;
  max_creditos;
  min_creditos;
  creditos_pos;
  great;
  restricoes_horarios;
  id;
  //DELETED_MESSAGE: string = "Professor deletado com sucesso!";
  //TIMEOUT_DELETED_MESSAGE = 2500;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    //private _flashMessagesService: FlashMessagesService
  ){    }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'],
    this.FBservice.getProfessorDetails(this.id).subscribe(professor =>{
        this.name = professor.name;
        this.SIAP = professor.SIAP;
    });
    let initiateProfessors: any[];
    this.FBservice.getProfessors().subscribe(professors =>{
      initiateProfessors = professors;
    });
  }

  onEditProfessor(){
    let professor = {
          name: this.name,
          SIAP: this.SIAP
    }
        
    this.FBservice.updateProfessor(this.id,professor);
    console.log(professor);
    this.router.navigate(['view-professors']);

  }
}
