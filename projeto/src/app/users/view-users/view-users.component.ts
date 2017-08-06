import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { DialogsService } from '../../services/dialogs.service';
import { SnackbarService } from '../../services/snackbar.service';

const DELETED_MESSAGE: string = "Usuário deletado com sucesso!";
const NOT_DELETED_MESSAGE: string = "Não foi possível remover o usuário. Tente novamente!";
const TIMEOUT_DELETED_MESSAGE = 2500;
const TIMEOUT_NOT_DELETED_MESSAGE = 5000;
const CONFIRM_DELETE_DIALOG_TITLE = "Excluir Usuário";

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: any[];

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
            .confirm(CONFIRM_DELETE_DIALOG_TITLE, this.deleteConfirmationMessage(user.name))
      .subscribe(res => {
        if (res) {
          if(this.FBservice.deleteUser(user)){
            this.snackService.openSnackBar(DELETED_MESSAGE, TIMEOUT_DELETED_MESSAGE);
          }else{
            this.snackService.openSnackBar(NOT_DELETED_MESSAGE, TIMEOUT_NOT_DELETED_MESSAGE);
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
