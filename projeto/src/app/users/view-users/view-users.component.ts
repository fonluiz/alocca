import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { SnackbarsService } from '../../services/snackbars.service';

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

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private snackService: SnackbarsService
  ) { }

  ngOnInit() {
    this.FBservice.getUsers().subscribe(users =>{
      this.users = users;
    });
  }

  onDeleteUser(user){
    if(this.FBservice.deleteUser(user)){
      this.snackService.openSnackBar(this.DELETED_MESSAGE,this.TIMEOUT_DELETED_MESSAGE);
    }else{
      this.snackService.openSnackBar(this.NOT_DELETED_MESSAGE,this.TIMEOUT_NOT_DELETED_MESSAGE);
    }
  }

}
