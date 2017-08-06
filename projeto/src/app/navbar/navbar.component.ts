import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AddSemesterComponent } from '../semesters/add-semester/add-semester.component';
import { AddCourseComponent } from '../courses/add-course/add-course.component';
import { FirebaseService } from '../services/firebase.service';
import { NavbarService } from "../services/navbar.service";
import { SnackbarsService } from '../services/snackbars.service';
import { DialogsService } from '../services/dialogs.service';
import { Semester } from '../semesters/semester.model';
//import { User } from '../users/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  /**
   * Semester options for selection.
   */
  semesters: Semester[];
  /**
   * Current selected semester.
   */
  selectedSemesterID: string;
  user: Observable<firebase.User>;
  TIMEOUT_NOT_REGISTERED = 5000;
  NOT_REGISTERED_MESSAGE: string = "Opa! Parece que você não está cadastrado. Entre em contato com o administrador.";
  /**
   * Message to display when a semester is deleted.
   */
  DELETED_SEMESTER: string = "Semestre removido com sucesso!"
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when a semester is deleted.
   */
  TIMEOUT_DELETED_SEMESTER: number = 2500;
  /**
   * Message to display when a semester is not deleted.
   */
  NOT_DELETED_SEMESTER: string = "Não foi possível remover o semestre. Tente novamente!"
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when a semester is not deleted.
   */
  TIMEOUT_NOT_DELETED_SEMESTER: number = 5000;

  constructor(
    public dialog: MdDialog,
    private FBservice: FirebaseService,
    public db: AngularFireDatabase,
    public dbAuth: AngularFireAuth,
    private _flashMessagesService: FlashMessagesService,
    private navbarService: NavbarService,
    private router: Router,
    private snackService: SnackbarsService,
    private dialogService: DialogsService) {
    this.user = dbAuth.authState
  }
  
  ngOnInit(){
    this.FBservice.getSemesters().subscribe(semesters => {
          this.semesters = semesters;
    });
  }

  /**
   * Open the dialog(form) to create a new semester.
   */
  openDialog() {
    var dialogRef = this.dialog.open(AddSemesterComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result===true){
        this.selectedSemesterID = this.FBservice.getCurrentSemester();
        this.emitSemesterSelected();
      }
    });
  }

  /**
   * Emit the selected semester and reload the page data.
   */
  emitSemesterSelected() {
      this.navbarService.emitSemesterSelected(this.selectedSemesterID);
      var currentPage = this.router.url;
      console.log(currentPage);
      this.router.navigate(['/home']).then(()=>{
        this.router.navigateByUrl(currentPage);
      });
  }

  /**
   * Removes the selected semester from the system.
   * 
   * @param id 
   * ID of the semester do be deleted.
   */
  removeSemester(id: string){
    var title = "Excluir semestre";
    var message = "Deseja realmente excluir esse semestre ?";
    this.dialogService
      .confirm(title, message)
      .subscribe(res => {
        if (res) {
          if(this.FBservice.removeSemester(id)){
            this.snackService.openSnackBar(this.DELETED_SEMESTER,this.TIMEOUT_DELETED_SEMESTER);
            this.selectedSemesterID = null;
            this.emitSemesterSelected();
          }else{
            this.snackService.openSnackBar(this.NOT_DELETED_SEMESTER,this.TIMEOUT_NOT_DELETED_SEMESTER);
          }
        }
      });
  }

  logout(){
    this.dbAuth.auth.signOut();
  }
}
