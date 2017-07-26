import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Class } from '../class.model'
import { Schedule } from '../schedule.model'

@Component({
  selector: 'app-add-allocation',
  templateUrl: './add-allocation.component.html',
  styleUrls: ['./add-allocation.component.css']
})
export class AddAllocationComponent implements OnInit {
  // courseCtrl:FormControl;
  // filteredCourses: any;
  SAVED_SUCCESSFULLY_MESSAGE: string = "Alocação salva com sucesso!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao cadastrar a alocação. Verifique se a turma já foi alocada.";
  TIMEOUT_SAVED_MESSAGE = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE = 5000;
  coursesList: any[];
  courseKey: any;
  classesNumber: number;

  courseName: string;

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
    this.FBservice.getCourses().subscribe(coursesnames =>{
      this.coursesList = coursesnames;
    });
  }

  saveNewClasses(){
    for (var _i = 1; _i <= this.classesNumber; _i++) {
          let newClass = new Class(null, this.courseName, _i, null, null, null, null);
          this.FBservice.saveClass(newClass);
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
