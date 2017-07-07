import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-allocation',
  templateUrl: './edit-allocation.component.html',
  styleUrls: ['./edit-allocation.component.css']
})
export class EditAllocationComponent implements OnInit {
  id;
  course;
  courseKey;
  professorOneName;
  professorTwoName;
  professorOneSIAP;
  professorTwoSIAP;
  professorsList: any[];
  coursesList: any[];

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

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
    });
  }

  onUpdateAllocation(){
    let allocation: any;
    if(this.professorTwoName){
      allocation = {
      courseKey: this.courseKey,
      professorOneSIAP: this.professorOneSIAP,
      professorTwoSIAP: this.professorTwoSIAP
    };
      this.FBservice.updateAllocation(this.id,allocation);

      this.router.navigate(['allocations']);
    }else{
      allocation = {
      courseKey: this.courseKey,
      professorOneSIAP: this.professorOneSIAP
    };
      this.FBservice.updateAllocation(this.id,allocation);

      this.router.navigate(['allocations']);
    }
  }
  
}
