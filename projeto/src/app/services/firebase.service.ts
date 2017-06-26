import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import {Professor} from '../professors/professor.model';

@Injectable()
export class FirebaseService {
  //"local"
  professorsNames: FirebaseListObservable<any[]>;
  coursesNames: FirebaseListObservable<any[]>;
  allocations: FirebaseListObservable<any[]>;
  allocation: FirebaseObjectObservable<any>;
  professors: FirebaseListObservable<any[]>;
  professor: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.professorsNames = db.list('/professorsNames') as FirebaseListObservable<ProfessorsName[]>;
    this.allocations = db.list('/allocations') as FirebaseListObservable<Allocation[]>;
    this.coursesNames = db.list('/coursesNames') as FirebaseListObservable<CoursesName[]>;
    this.professors = db.list('/professors') as FirebaseListObservable<Professor[]>;
  }

  getProfessorsNames(){
    return this.professorsNames;
  }
  getCoursesNames(){
    return this.coursesNames;
  }


  getAllocations(){
    return this.allocations;
  }
  addAllocation(allocation){
    return this.allocations.push(allocation);
  }
  getAllocationDetails(id){
    this.allocation = this.db.object('/allocations/'+id) as FirebaseObjectObservable<Allocation>;
    return this.allocation;
  }
  updateAllocation(id,allocation){
    return this.allocations.update(id,allocation);
  }
  deleteAllocation(id){
    return this.allocations.remove(id);
  }


  addNewProfessor(professor){
    return this.professors.push(professor);
  }
  getProfessors(){
    return this.professors;
  }
  getProfessorDetails( id){
    this.professor = this.db.object('/professors/'+id) as FirebaseObjectObservable<Professor>
    return this.professor;
  }
  updateProfessor(id, professor){
    return this.professors.update(id,professor);
  }


}

interface ProfessorsName{
  $key?:string;
  Nome?: string;
}

interface CoursesName{
  $key?:string;
  nome?: string;
}

interface Allocation{
  $key?:string;
  course?: string;
  professorOne?: string;
  professorTwo?: string;
}
