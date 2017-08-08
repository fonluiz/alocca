import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { DialogsService } from '../../services/dialogs.service';
import { SnackbarService } from '../../services/snackbar.service';
import { User } from "app/users/user.model";

const DELETED_MESSAGE: string = "Usuário deletado com sucesso!";
const NOT_DELETED_MESSAGE: string = "Não foi possível remover o usuário. Tente novamente!";
const CONFIRM_DELETE_DIALOG_TITLE: string = "Excluir Usuário";
const TIMEOUT_DELETED_MESSAGE: number = 2500;
const TIMEOUT_NOT_DELETED_MESSAGE: number = 5000;

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  // should be private, but if so, maybe it won't work correctly.
  users: User[];

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
