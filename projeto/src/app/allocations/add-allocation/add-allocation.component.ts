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
  // courseCtrl:FormControl;
  // filteredCourses: any;

  professorsList: any[];
  coursesList: any[];
  courseKey: any;
  professorOneSIAP: any;
  professorTwoSIAP: any;
  note: string;
  SAVED_SUCCESSFULLY_MESSAGE: string = "Alocação salva com sucesso!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao cadastrar a alocação. Verifique se a turma já foi alocada.";
  TIMEOUT_SAVED_MESSAGE = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) {
      // this.courseCtrl = new FormControl();
      // this.filteredCourses = this.courseCtrl.valueChanges
      //   .startWith(null)
      //   .map(name => this.filterCourses(name));
  }

  // filterCourses(val: string) {
  //   return val ? this.coursesList.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
  //              : this.coursesList;
  // }


  ngOnInit() {
    this.FBservice.getProfessors().subscribe(professorsnames =>{
      this.professorsList = professorsnames;
    });
    this.FBservice.getCourses().subscribe(coursesnames =>{
      this.coursesList = coursesnames;
    });
  }

  onAddNewAllocation(){
    let allocation: any;
    console.log(this.professorOneSIAP+this.courseKey);

    if(this.professorOneSIAP==this.professorTwoSIAP){
      this.flashMessage.show('Escolha Docentes diferentes.', {cssClass: 'alert-danger', timeout: 7000});
    }else if(this.professorTwoSIAP){
      allocation = {
      courseKey: this.courseKey,
      professorOneSIAP: this.professorOneSIAP,
      professorTwoSIAP: this.professorTwoSIAP,
      note: this.note
    };

      this.addAlocationToFirebase(allocation);

      this.courseKey = null;
      this.professorOneSIAP = null;
      this.professorTwoSIAP = null;
      this.note = null;

    }else{
      allocation = {
      courseKey: this.courseKey,
      professorOneSIAP: this.professorOneSIAP,
      note: this.note,
    };
      this.addAlocationToFirebase(allocation);

      this.courseKey = null;
      this.professorOneSIAP = null;
      this.note = null;
      
    }
  }

  addAlocationToFirebase(allocation) {
    let savedSuccessfully: boolean = this.FBservice.addAllocation(allocation);

    if (savedSuccessfully) {
        this.flashMessage.show(this.SAVED_SUCCESSFULLY_MESSAGE, { cssClass: 'alert-success', timeout: this.TIMEOUT_SAVED_MESSAGE });
    } else {
        this.flashMessage.show(this.NOT_SAVED_MESSAGE, { cssClass: 'alert-danger', timeout: this.TIMEOUT_NOT_SAVED_MESSAGE });
    }
    this.router.navigate(['/allocations']);
  }
}
