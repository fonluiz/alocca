import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { ClassesDmService } from '../../data-manager/classes/classes-dm.service'


@Component({
  selector: 'app-class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.css']
})
export class ClassTableComponent implements OnInit {
  classesList: any[];
  selectedSemesterID: string; 

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private navbarService: NavbarService,
    private classesDM: ClassesDmService
  ) {
    this.navbarService.getSemesterSelectedEmitter().subscribe(
      semester => {this.classesDM.setSemester(semester)}
    );
  }

  ngOnInit() {
    this.classesDM.getClasses().subscribe( classes =>{
      this.classesList = classes;
    })
  }

  onDeleteClass(id){
    this.classesDM.deleteClass(id);

  }
  
  onChangeCAStatus(id,stats){
    this.FBservice.changeCAStatus(id,stats);
  }
}
