import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ClassesStub } from '../classes.stub';
import { Schedule } from '../schedule.model';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css'],
  providers: [ClassesStub]
})
export class SchedulesTableComponent implements OnInit {
  //chane type to class[]
  schedules: any[];
  DELETED_SUCCESSFULLY_MESSAGE: string =  "Aula removida do horário";
  TIMEOUT_DELETED_MESSAGE: number = 3000;

  constructor(
    private FBservice: FirebaseService,
    private schedulesStub: ClassesStub,
    private snackService: SnackbarService
  ) {
  }

  ngOnInit() {
    this.FBservice.getClassesOnSchedule().subscribe(classes =>{
      this.schedules = classes;
    })
  }

  onDeleteClassSchedule(){
    //add the delete function from firebase when fully integrated with classes
    this.snackService.openSnackBar(this.DELETED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_DELETED_MESSAGE);
  }



}
