/**
 * @api {component} projeto/src/app/allocations/edit-allocation/edit-allocation.component.ts Edit Allocation Component
 * @apiName Edit Allocation Component
 * @apiGroup Allocation
 */

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Class } from '../class.model';
import { Schedule } from '../schedule.model';

@Component({
  selector: 'app-edit-allocation',
  templateUrl: './edit-allocation.component.html',
  styleUrls: ['./edit-allocation.component.css']
})
export class EditAllocationComponent implements OnInit {
  id;
  course;
  courseKey;
  oldCourseKey;
  note: string = "";
  oldNote;
  professorOneName;
  professorTwoName;
  professorOneSIAP;
  professorTwoSIAP;

  professorsList: any[];
  coursesList: any[];


  CAcontrol: boolean;
  courseName: string;
  number: number;
  professor1: string;
  professor2: string;
  schedules: Schedule[];
//  note: string;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.FBservice.getProfessors().subscribe(professorsnames =>{
      this.professorsList = professorsnames;
    });
    this.FBservice.getCourses().subscribe(coursesnames =>{
      this.coursesList = coursesnames;
    });

    this.FBservice.getAllocationDetails(this.id).subscribe(allocation =>{
      this.course = allocation.course;
      this.professorOneName = allocation.professorOneName;
      if(allocation.professorTwoName){
        this.professorTwoName = allocation.professorTwoName;
      }
      this.oldCourseKey = allocation.course+allocation.courseCredits;
      this.oldNote = allocation.note;
    });

    this.FBservice.getClassDetails(this.id).subscribe(class_ =>{
      this.courseName = class_.course;
      this.number = class_.number;
      this.professor1 = class_.professor1;
      this.professor2 = class_.professor2;
      this.schedules = class_.schedules;
      this.note = class_.note;
    });
  }

  onUpdateClass(){
    let newClass = new Class(
      this.CAcontrol, 
      this.courseName, 
      this.number, 
      this.professor1, 
      this.professor2, 
      this.schedules, 
      this.note
    );
    console.log(newClass);
    this.FBservice.updateClass(this.id, newClass);
  }

  onUpdateAllocation(){
    let allocation: any;
    if(this.professorTwoSIAP){
      allocation = {
      courseKey: this.courseKey,
      professorOneSIAP: this.professorOneSIAP,
      professorTwoSIAP: this.professorTwoSIAP,
      oldCourseKey: this.oldCourseKey,
      note: this.note
    };
      if(this.FBservice.updateAllocation(this.id,allocation)){
        //change to flash_message
        console.log('foi');
      }else{
        //change to flash_message
        console.log('não foi YAY');
      }

      this.router.navigate(['allocations']);
    }else{
      allocation = {
      courseKey: this.courseKey,
      professorOneSIAP: this.professorOneSIAP,
      oldCourseKey: this.oldCourseKey,
      note: this.note
    };
      if(this.FBservice.updateAllocation(this.id,allocation)){
        //change to flash_message
        console.log('foi');
      }else{
        //change to flash_message
        console.log('não foi YAY');
      }

      this.router.navigate(['allocations']);
    }
  }
  
}
