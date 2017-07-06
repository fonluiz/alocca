/**
 * @api {component} projeto/src/app/professors/view-professors/view-professors.component.ts View Professors Component
 * @apiName View Professors Component
 * @apiGroup Professor
 */

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Professor } from '../professor.model';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-view-professors',
  templateUrl: './view-professors.component.html',
  styleUrls: ['./view-professors.component.css']
})
export class ViewProfessorsComponent implements OnInit {
    //professores: Professor[] = PROFESSORES
    professors: any
    id: any;
    DELETED_MESSAGE: string = "Professor deletado com sucesso!";
    TIMEOUT_DELETED_MESSAGE = 2500;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.FBservice.getProfessors().subscribe(professors =>{
      this.professors = professors;
    });
  }

  onDeleteProfessor(id){
    this.FBservice.deleteProfessor(id);
    this._flashMessagesService.show(this.DELETED_MESSAGE, { cssClass: 'alert-success', timeout: this.TIMEOUT_DELETED_MESSAGE });
    this.router.navigate(['/view-professors']);
  }
  

}
