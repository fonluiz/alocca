import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { DialogsService } from '../../services/dialogs.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: any[];
  DELETED_MESSAGE: string = "Usuário deletado com sucesso!";
  NOT_DELETED_MESSAGE: string = "Não foi possível remover o usuário. Tente novamente!";
  TIMEOUT_DELETED_MESSAGE = 2500;
  TIMEOUT_NOT_DELETED_MESSAGE = 5000;
  CONFIRM_DELETE_DIALOG_TITLE = "Excluir Usuário";

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogsService: DialogsService,
    private snackService: SnackbarService
  ) { }

  ngOnInit() {
    this.FBservice.getUsers().subscribe(users =>{
      this.users = users;
    });
  }

  onDeleteUser(user){
    this.dialogsService
            .confirm(this.CONFIRM_DELETE_DIALOG_TITLE, this.deleteConfirmationMessage(user.name))
      .subscribe(res => {
        if (res) {
          if(this.FBservice.deleteUser(user)){
            this.snackService.openSnackBar(this.DELETED_MESSAGE,this.TIMEOUT_DELETED_MESSAGE);
          }else{
            this.snackService.openSnackBar(this.NOT_DELETED_MESSAGE,this.TIMEOUT_NOT_DELETED_MESSAGE);
          }
          this.router.navigate(['/view-users']);
        }
      });
  }

  deleteConfirmationMessage(name) {
      var message = "Deseja realmente excluir " + name + " ?";
      return message;
  }

}
