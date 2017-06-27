import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Professor } from '../professor.model';
import { PROFESSORES } from '../professor.mock';
import { Router, ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-view-professors',
  templateUrl: './view-professors.component.html',
  styleUrls: ['./view-professors.component.css']
})
export class ViewProfessorsComponent implements OnInit {
    //professores: Professor[] = PROFESSORES
    professors: any
    id: any;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.FBservice.getProfessors().subscribe(professors =>{
      this.professors = professors;
    });
  }
  

}
