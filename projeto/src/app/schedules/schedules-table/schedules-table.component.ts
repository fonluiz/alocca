import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ClassesStub } from '../classes.stub';
import { Schedule } from '../schedule.model';
import { SnackbarsService } from '../../services/snackbars.service';

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css'],
  providers: [ClassesStub]
})
export class SchedulesTableComponent implements OnInit {
  //chane type to class[]
  classes: any[];
  currentClassKey: string;
  SAVED_SUCCESSFULLY_MESSAGE: string = "Aula adicionada com sucesso!";
  TIMEOUT_SAVED_MESSAGE: number = 2500;
  ALREADY_SAVED_MESSAGE: string = "A aula já está alocada nesse horário";
  TIMEOUT_ALREADY_SAVED: number  = 5000;
  DELETED_SUCCESSFULLY_MESSAGE: string =  "Aula removida do horário";
  TIMEOUT_DELETED_MESSAGE: number = 3000;
  NOT_DELETED_MESSAGE: string =  "Não foi possível desalocar a turma. Tente novamente!";
  TIMEOUT_NOT_DELETED_MESSAGE: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private schedulesStub: ClassesStub,
    private snackService: SnackbarsService
  ) {
  }

  ngOnInit() {
    this.FBservice.getClasses().subscribe(currentClasses =>{
      this.classes = currentClasses;
    })
  }

  onAddClassToSchedule(day: string, hour: number){
    if(this.FBservice.addClassToSchedule(this.currentClassKey,day,hour)){
      this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_SAVED_MESSAGE);
    }else{
      this.snackService.openSnackBar(this.ALREADY_SAVED_MESSAGE,this.TIMEOUT_ALREADY_SAVED);
    }
    this.currentClassKey = null;
  }

  onDeleteClassSchedule(classKey: string, day: string, hour:number){
    if(this.FBservice.deleteClassFromSchedule(classKey,day,hour)){
      this.snackService.openSnackBar(this.DELETED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_DELETED_MESSAGE);
    }else{
      this.snackService.openSnackBar(this.NOT_DELETED_MESSAGE,this.TIMEOUT_NOT_DELETED_MESSAGE);
    }
  }



}
