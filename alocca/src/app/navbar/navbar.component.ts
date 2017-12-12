import { Component, OnInit} from '@angular/core';
import { MatDialog, MatSelectChange} from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { AddSemesterComponent } from '../semesters/add-semester/add-semester.component';
import { Semester } from '../semesters/semester.model';

import { FirebaseService } from '../services/firebase.service';
import { SemestersDmService } from '../data-manager/semesters/semesters-dm.service';
import { NavbarService } from '../services/navbar.service';
import { SnackbarService } from '../services/snackbar.service';
import { DialogsService } from '../services/dialogs.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  
  semesters: any[];
  selectedSemesterID: string;
  user: Observable<firebase.User>;
  DELETED_SEMESTER: string = "Semestre removido com sucesso!"
  TIMEOUT_DELETED_SEMESTER: number = 2500; 
  NOT_DELETED_SEMESTER: string = "Não foi possível remover o semestre. Tente novamente!"
  TIMEOUT_NOT_DELETED_SEMESTER: number = 5000;


  constructor(
    public dialog: MatDialog,
    private FBservice: FirebaseService,
    private semestersDM: SemestersDmService,
    public dbAuth: AngularFireAuth,
    private navbarService: NavbarService,
    private dialogService: DialogsService,
    private snackService: SnackbarService,
    private router: Router) {
    this.user = dbAuth.authState
  }
  
  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit(){
    this.semestersDM.getSemesters().subscribe(semesters => {
      this.semesters = semesters;
    });
  }

  /**
   * Open the dialog(form) to create a new semester.
   */
  openDialog() {
    var dialogRef = this.dialog.open(AddSemesterComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedSemesterID = result
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
            if (this.semestersDM.removeSemester(id)){
            this.snackService.openSnackBar(this.DELETED_SEMESTER,this.TIMEOUT_DELETED_SEMESTER);
            this.selectedSemesterID = null;
            this.emitSemesterSelected();
          }else{
            this.snackService.openSnackBar(this.NOT_DELETED_SEMESTER,this.TIMEOUT_NOT_DELETED_SEMESTER);
          }
        }
      });
  }

  /**
   * Logs the user out of the system.
   */
  logout(){
    this.dbAuth.auth.signOut();
  }
}
