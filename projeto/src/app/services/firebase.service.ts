import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  //"local"
  professorsNames: FirebaseListObservable<any[]>;
  coursesNames: FirebaseListObservable<any[]>;
  allocations: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.professorsNames = db.list('/professorsNames') as FirebaseListObservable<ProfessorsName[]>;
    this.allocations = db.list('/allocations') as FirebaseListObservable<Allocation[]>;
    this.coursesNames = db.list('/coursesNames') as FirebaseListObservable<CoursesName[]>;
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
