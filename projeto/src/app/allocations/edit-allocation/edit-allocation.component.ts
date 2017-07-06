/**
 * @api {component} projeto/src/app/allocations/edit-allocation/edit-allocation.component.ts Edit Allocation Component
 * @apiName Edit Allocation Component
 * @apiGroup Allocation
 */

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
  professorOne;
  professorTwo;
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
      this.professorOne = allocation.professorOne;
      this.professorTwo = allocation.professorTwo;
    });
  }

  onUpdateAllocation(){
    let allocation: any;
    if(!(this.course)){
      if(!(this.professorOne) && !(this.professorTwo)){
        this.flashMessage.show('Escolha pelo menos uma disciplina e um(a) professor(a).', {cssClass: 'alert-danger', timeout: 7000});
      }else{
        this.flashMessage.show('Escolha uma disciplina.', {cssClass: 'alert-danger', timeout: 5000});
      }
    }else if(!(this.professorOne) && !(this.professorTwo)){
      this.flashMessage.show('Escolha pelo menos um Docente para a Disicplina.', {cssClass: 'alert-danger', timeout: 7000});
    }else if(!(this.professorOne) && (this.professorTwo)){
      this.flashMessage.show('Escolha o(a) professor(a) como o(a) primeiro(a) Docente.', {cssClass: 'alert-danger', timeout: 7000});
    }else if(this.professorTwo){
      allocation = {
      course: this.course,
      professorOne: this.professorOne,
      professorTwo: this.professorTwo};
      this.FBservice.updateAllocation(this.id,allocation);

      this.router.navigate(['allocations']);
    }else{
      allocation = {
      course: this.course,
      professorOne: this.professorOne,
      professorTwo: ""};
      this.FBservice.updateAllocation(this.id,allocation);

      this.router.navigate(['allocations']);
    }
  }
  
}
