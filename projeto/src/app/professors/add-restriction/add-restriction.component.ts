/**
 * @api {component} projeto/src/app/professors/add-restriction/add-restriction.component.ts Add Restriction Component
 * @apiName Add Restriction Component
 * @apiGroup Professor
 */

import { Component, OnInit } from '@angular/core';
 
import  { MdCheckbox } from '@angular/material';
import { ScheduleRestriction } from '../schedule-restriction.model'
import { ProfessorRestriction } from '../professor-restriction.model'
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-restriction',
  templateUrl: './add-restriction.component.html',
  styleUrls: ['./add-restriction.component.css']
})

export class AddRestrictionComponent implements OnInit {
  
  maxCredits: number;
  minCredits: number;
  graduateCredits: number;
  HOURS = ["7:00 - 8:00", "8:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00",
          "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00", "20:00 - 22:00"];
  integerHours = [7, 8, 10, 12, 14, 16, 18, 20, 22];
  professor_id: string;

  constructor(
      private FBservice: FirebaseService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.professor_id = this.route.snapshot.params['id']
  }

  private getScheduleRestrictionsFromTable = (): ScheduleRestriction => {
    // Monday
    var monday: number[] = [];
    var iteration = 0;
    for (var i = 1; i <= 40; i+=5) {
      var checkbox = <MdCheckbox><any>document.getElementById("input-md-checkbox-"+i);
      if (checkbox.checked) {
        monday.push(this.integerHours[iteration]);
      }
      iteration++;
    }
    // Tuesday
    var tuesday: number[] = [];
    var iteration = 0;
    for (var i = 2; i <= 40; i+=5) {
      var checkbox = <MdCheckbox><any>document.getElementById("input-md-checkbox-"+i);
      if (checkbox.checked) {
        tuesday.push(this.integerHours[iteration]);
      }
      iteration++;
    }
    // Wednesday
    var wednesday: number[] = [];
    var iteration = 0;
    for (var i = 3; i <= 40; i+=5) {
      var checkbox = <MdCheckbox><any>document.getElementById("input-md-checkbox-"+i);
      if (checkbox.checked) {
        wednesday.push(this.integerHours[iteration]);
      }
      iteration++;
    }
    // Thursday
    var thursday: number[] = [];
    var iteration = 0;
    for (var i = 4; i <= 40; i+=5) {
      var checkbox = <MdCheckbox><any>document.getElementById("input-md-checkbox-"+i);
      if (checkbox.checked) {
        thursday.push(this.integerHours[iteration]);
      }
      iteration++;
    }
    // Friday
    var friday: number[] = [];
    var iteration = 0;
    for (var i = 5; i <= 40; i+=5) {
      var checkbox = <MdCheckbox><any>document.getElementById("input-md-checkbox-"+i);
      if (checkbox.checked) {
        friday.push(this.integerHours[iteration]);
      }
      iteration++;
    } 

    let scheduleRestrictions = new ScheduleRestriction(monday, tuesday, wednesday, thursday, friday);
    return scheduleRestrictions;
  }

  private submitRestrictionsForm() {
    let restrictions = new ProfessorRestriction(
       this.professor_id,
       this.minCredits,
       this.maxCredits,
       this.graduateCredits,
       this.getScheduleRestrictionsFromTable()
    );

    this.FBservice.saveProfessorRestriction(restrictions);
    this.router.navigate(['allocations']);
  }

}
