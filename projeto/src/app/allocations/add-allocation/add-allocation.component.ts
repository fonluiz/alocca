import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

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
    private router: Router
    ) {
  }

  ngOnInit() {
    this.FBservice.getProfessorsNames().subscribe(professorsnames =>{
      this.professorsList = professorsnames;
    });
    this.FBservice.getCoursesNames().subscribe(coursesnames =>{
      this.coursesList = coursesnames;
    });
  }

  addNewAllocation(){
    let allocation: any;
    if(this.professorTwo){
      allocation = {
      course: this.course,
      professorOne: this.professorOne,
      professorTwo: this.professorTwo
      };
    }else{
      allocation = {
      course: this.course,
      professorOne: this.professorOne
      };
    }

    this.FBservice.addAllocation(allocation);

    this.router.navigate(['#']);


  }

}
