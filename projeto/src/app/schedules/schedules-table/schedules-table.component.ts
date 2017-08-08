import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css'],
})
export class SchedulesTableComponent implements OnInit {
  //chane type to class[]
  scheduledClasses: any[];
  classesToSchedule: any[];
  DELETED_SUCCESSFULLY_MESSAGE: string =  "Aula removida do horário";
  TIMEOUT_DELETED_MESSAGE: number = 3000;

  constructor(
    private FBservice: FirebaseService,
    private snackService: SnackbarService
  ) {
  }

  ngOnInit() {
    this.FBservice.getClasses().subscribe(currentClasses =>{
      this.scheduledClasses = currentClasses;
      this.classesToSchedule = currentClasses;
    })
  }

  onDeleteClassSchedule(){
    //add the delete function from firebase when fully integrated with classes
    this.snackService.openSnackBar(this.DELETED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_DELETED_MESSAGE);
  }



}
