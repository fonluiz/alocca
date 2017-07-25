import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { NavbarService } from "app/navbar/navbar.service";

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css']
})
export class ViewClassComponent implements OnInit {
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

}
