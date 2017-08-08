import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { DialogsService } from '../../services/dialogs.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Request } from '../request.model';

const DELETED_MESSAGE: string = "Requisição ignorada!";
const NOT_DELETED_MESSAGE: string = "Não foi possível remover a requisição. Tente novamente!";
const ACCEPTED_MESSAGE: string = "Requisição aceita!";
const NOT_ACCEPTED_MESSAGE: string = "Não foi possível aceitar a requisição. Tente novamente!";
const CONFIRM_DELETE_DIALOG_TITLE: string = "Excluir Requisição";
const TIMEOUT_DELETED_MESSAGE: number = 2500;
const TIMEOUT_ACCEPTED_MESSAGE: number = 2500;
const TIMEOUT_NOT_DELETED_MESSAGE: number = 5000;
const TIMEOUT_NOT_ACCEPTED_MESSAGE: number = 5000;

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {
  requests: Request[];

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogsService: DialogsService,
    private snackService: SnackbarService
  ) { }

  ngOnInit() {
    this.FBservice.getRequests().subscribe(requests =>{
      this.requests = requests;
    });
  }

  onDeleteRequest(request){
    this.dialogsService
        .confirm(CONFIRM_DELETE_DIALOG_TITLE, this.deleteConfirmationMessage(request.name))
      .subscribe(res => {
        if (res) {
          if(this.FBservice.deleteRequest(request)){
            this.snackService.openSnackBar(DELETED_MESSAGE, TIMEOUT_DELETED_MESSAGE);
          }else{
            this.snackService.openSnackBar(NOT_DELETED_MESSAGE, TIMEOUT_NOT_DELETED_MESSAGE);
          }
        }
      });
  }

  onAcceptRequest(request){
    if(this.FBservice.acceptRequest(request)){
      this.snackService.openSnackBar(ACCEPTED_MESSAGE, TIMEOUT_ACCEPTED_MESSAGE);
    }else{
      this.snackService.openSnackBar(NOT_ACCEPTED_MESSAGE, TIMEOUT_NOT_ACCEPTED_MESSAGE);
    }
  }

  deleteConfirmationMessage(name) {
      var message = "Deseja realmente excluir " + name + " ?";
      return message;
  }

}
