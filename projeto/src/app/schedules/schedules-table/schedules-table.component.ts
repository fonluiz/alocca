import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ClassesStub } from '../classes.stub';
import { Schedule } from '../schedule.model';

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css'],
  providers: [ClassesStub]
})
export class SchedulesTableComponent implements OnInit {
  schedules: Schedule[];

  constructor(
    private FBservice: FirebaseService,
    private schedulesStub: ClassesStub
  ) {
  }

  ngOnInit() {
    /* UNCOMMENT THIS ONCE FUNCTION IS WORKING
    this.FBservice.getClasses().subscribe(classes => {
      this.classes = classes;
    });
    */
    this.schedules = this.schedulesStub.getSchedules();
  }



}
