import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-allocation',
  templateUrl: './add-allocation.component.html',
  styleUrls: ['./add-allocation.component.css']
})
export class AddAllocationComponent implements OnInit {
  professorsList: any[];
  coursesList: any[];
  course: any;
  professorOne: any;
  professorTwo: any;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) {}

  ngOnInit() {
    this.FBservice.getProfessors().subscribe(professorsnames =>{
      this.professorsList = professorsnames;
    });
    this.FBservice.getCourses().subscribe(coursesnames =>{
      this.coursesList = coursesnames;
    });
  }

  addNewAllocation(){
    let allocation: any;
    if(this.professorOne && (this.professorOne==this.professorTwo)){
      this.flashMessage.show('Escolha Docentes diferentes.', {cssClass: 'alert-danger', timeout: 7000});
    }else if(!(this.course)){
      if(!(this.professorOne)){
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
      this.FBservice.addAllocation(allocation);

      this.course = "";
      this.professorOne = "";
      this.professorTwo = "";

      this.router.navigate(['allocations']);
    }else{
      allocation = {
      course: this.course,
      professorOne: this.professorOne};
      this.FBservice.addAllocation(allocation);

      this.course = "";
      this.professorOne = "";

      this.router.navigate(['allocations']);
    }


  }

}
