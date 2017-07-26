import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { NavbarService } from "app/navbar/navbar.service";

@Component({
  selector: 'app-allocation-table',
  templateUrl: './allocation-table.component.html',
  styleUrls: ['./allocation-table.component.css']
})
export class AllocationTableComponent implements OnInit {
  classesList: any[];
  selectedSemesterID: string;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private navbarService: NavbarService
  ) { }

  ngOnInit() {
    this.FBservice.getClasses().subscribe( classes =>{
      this.classesList = classes;
      });
      this.selectedSemesterID = this.navbarService.getSemester();

      console.log(this.FBservice.getClasses());
  }


  onDeleteAllocation(id,course,credits,classNumber){
    if(this.FBservice.deleteAllocation(id,course+credits,classNumber)){
      this.router.navigate(['/allocations']);
    }
  }
  onChangeCAStatus(id,stats){
    if(this.FBservice.changeCAStatus(id,stats)){
      this.router.navigate(['/allocations']);
    }
  }
  getSelectedSemester() {
      this.selectedSemesterID = this.navbarService.getSemester();
  }
}

