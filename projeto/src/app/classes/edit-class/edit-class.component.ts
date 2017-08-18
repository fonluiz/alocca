import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';
//remove params???
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Class } from '../class.model';
import { Schedule } from '../schedule.model';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  id: string;
  professorsList: any[];
  coursesList: any[];

  course: string;

  professor1: string;
  professor2: string;
  currentNote: string;
  

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
      this.professorsList = professorsnames
    });

    this.FBservice.getClassDetails(this.id).subscribe(class_ =>{
      this.course = class_.course;
      if(class_.professor1){
        this.professor1 = class_.professor1;
      }
      if(class_.professor2){
        this.professor2 = class_.professor2;
      }
      if(class_.note){
        this.currentNote = class_.note;
      }
    });
  }

  onUpdateClass(){
    if(!this.professor1){
      this.professor1 = "";
    }
    if(!this.professor2){
      this.professor2 = "";
    }
    if(!this.currentNote){
      this.currentNote = "";
    }
     let newClass = {
       professor1: this.professor1, 
       professor2: this.professor2, 
       note: this.currentNote
     };
    this.FBservice.updateClass(this.id, newClass);
    this.router.navigate(['/classes']);
  }
}
