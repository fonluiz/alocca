import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { DialogsService } from '../../services/dialogs.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {
  requests: any[];
  DELETED_MESSAGE: string = "Requisição ignorada!";
  NOT_DELETED_MESSAGE: string = "Não foi possível remover a requisição. Tente novamente!";
  ACCEPTED_MESSAGE: string = "Requisição aceita!";
  NOT_ACCEPTED_MESSAGE: string = "Não foi possível aceitar a requisição. Tente novamente!";
  TIMEOUT_DELETED_MESSAGE = 2500;
  TIMEOUT_ACCEPTED_MESSAGE = 2500;
  TIMEOUT_NOT_DELETED_MESSAGE = 5000;
  TIMEOUT_NOT_ACCEPTED_MESSAGE = 5000;

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
    var title = "Excluir Requisição";
    var message = "Deseja realmente excluir a requisição feita por "+request.name+" ?";
    this.dialogsService
      .confirm(title, message)
      .subscribe(res => {
        if (res) {
          if(this.FBservice.deleteRequest(request)){
            this.snackService.openSnackBar(this.DELETED_MESSAGE,this.TIMEOUT_DELETED_MESSAGE);
          }else{
            this.snackService.openSnackBar(this.NOT_DELETED_MESSAGE,this.TIMEOUT_NOT_DELETED_MESSAGE);
          }
        }
      });
  }

  onAcceptRequest(request){
    if(this.FBservice.acceptRequest(request)){
      this.snackService.openSnackBar(this.ACCEPTED_MESSAGE,this.TIMEOUT_ACCEPTED_MESSAGE);
    }else{
      this.snackService.openSnackBar(this.NOT_ACCEPTED_MESSAGE,this.TIMEOUT_NOT_ACCEPTED_MESSAGE);
    }

  }

}
