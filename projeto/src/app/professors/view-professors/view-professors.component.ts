import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Professor } from '../professor.model';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { DialogsService } from '../../services/dialogs.service';
import { NavbarService } from "../../navbar/navbar.service";
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-view-professors',
  templateUrl: './view-professors.component.html',
  styleUrls: ['./view-professors.component.css']
})
export class ViewProfessorsComponent implements OnInit {
    //professores: Professor[] = PROFESSORES
    professors: any;
    id: any;
    DELETED_MESSAGE: string = "Professor deletado com sucesso!";
    NOT_DELETED_MESSAGE: string = "Não foi possível remover o professor. Tente novamente!";
    TIMEOUT_DELETED_MESSAGE = 2500;
    TIMEOUT_NOT_DELETED_MESSAGE = 5000;
    selectedSemesterID: string;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogsService: DialogsService,
    private snackService: SnackbarService,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.FBservice.getProfessors().subscribe(professors =>{
      this.professors = professors;
      });
  }


  onDeleteProfessor(id, professorName){
    var title = "Excluir Professor";
    var message = "Deseja realmente excluir "+professorName+" ?";
    this.dialogsService
      .confirm(title, message)
      .subscribe(res => {
        if (res) {
          if(this.FBservice.deleteProfessor(id)){
          this.snackService.openSnackBar(this.DELETED_MESSAGE,this.TIMEOUT_DELETED_MESSAGE);
          }else{
            this.snackService.openSnackBar(this.NOT_DELETED_MESSAGE,this.TIMEOUT_NOT_DELETED_MESSAGE);
          }
        }
      });
  }

}
