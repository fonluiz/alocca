import { Component, OnInit } from '@angular/core';
import { Professor } from '../professor.model';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent implements OnInit {
  name;
  nickname;
  SIAPE;
  max_creditos;
  min_creditos;
  creditos_pos;
  great;
  restricoes_horarios;
  id;
  EDITED_PROFESSOR_MESSAGE: string = "Alterações efetuadas com sucesso!";
  NOT_EDITED_PROFESSOR_MESSAGE: string = "Já existe um professor com o SIAPE escolhido!";
  TIMEOUT_EDITED_MESSAGE = 2500;
  TIMEOUT_NOT_EDITED_MESSAGE = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private snackService: SnackbarService
  ){    }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'],
    this.FBservice.getProfessorDetails(this.id).subscribe(professor =>{
        this.name = professor.name;
        this.SIAPE = professor.SIAPE;
        this.nickname = professor.nickname;

    });
    let initiateProfessors: any[];
    this.FBservice.getProfessors().subscribe(professors =>{
      initiateProfessors = professors;
    });
  }

  onEditProfessor(){
    let professor = {
      nickname: this.nickname,
      name: this.name,
      SIAPE: this.SIAPE
    }
        
    if(this.FBservice.updateProfessor(this.id,professor)){
      this.snackService.openSnackBar(this.EDITED_PROFESSOR_MESSAGE,this.TIMEOUT_EDITED_MESSAGE);
    }else{
      this.snackService.openSnackBar(this.NOT_EDITED_PROFESSOR_MESSAGE,this.TIMEOUT_NOT_EDITED_MESSAGE);
    }
    this.router.navigate(['view-professors']);

  }
}
