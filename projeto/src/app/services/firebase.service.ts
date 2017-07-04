import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import {Professor} from '../professors/professor.model';
import {Course} from '../courses/course.model';
import { Allocation } from '../allocations/allocation.model';
import { Semester } from '../semesters/semester.model';

@Injectable()
export class FirebaseService {
  //"local"
  allocations: FirebaseListObservable<any[]>;
  allocation: FirebaseObjectObservable<any>;
  professors: FirebaseListObservable<any[]>;
  professor: FirebaseObjectObservable<any>;
  courses: FirebaseListObservable<any[]>;
  course: FirebaseObjectObservable<any>;
  semesters: FirebaseListObservable<any[]>;
  semester: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.allocations = db.list('/allocations') as FirebaseListObservable<Allocation[]>;
    this.professors = db.list('/professors') as FirebaseListObservable<Professor[]>;
    this.courses = db.list('/courses') as FirebaseListObservable<Course[]>;
    this.semesters = db.list('/semesters') as FirebaseListObservable<Semester[]>;
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


  addNewProfessor(newprofessor){
    if(this.sameSIAPProfessor(newprofessor)){
      return false;
    } else {
        this.professors.push(newprofessor);
        return true;
    }
  }
  getProfessors(){ 
    return this.professors;
  }
  getProfessorDetails( id){
    this.professor = this.db.object('/professors/'+id) as FirebaseObjectObservable<Professor>
    return this.professor;
  }
  updateProfessor(id, professor){
    if(!(this.sameSIAPProfessor(professor))){
      return false;
    }
    return this.professors.update(id,professor);
  }
  deleteProfessor(id){
    return this.professors.remove(id);
  }
  sameSIAPProfessor(newProfessor){
    var retorn: Boolean = false;
    this.getProfessors().subscribe(professors =>{
      professors.forEach(element => {
        if (element.SIAP == newProfessor.SIAP) {
          retorn = true;
        } else {
         }
      });
    });
    return retorn;
  }

  semesterAlreadySaved(newSemester) {
      this.getSemesters().subscribe(semesters => {
          semesters.forEach(element => {
              if (element.semester_id == newSemester.semester_id) {
                  return true;
              }
          })
      })
      return false;
  }

  addNewCourse(course){
    return this.courses.push(course);
  }
  getCourses(){
    return this.courses;
  }
  getCourseDetails( id){
    this.course = this.db.object('/courses/'+id) as FirebaseObjectObservable<Course>
    return this.course;
  }
  updateCourse(id, course){
    return this.courses.update(id,course);
  }
  deleteCourse(id){
    return this.courses.remove(id);
  }

  addNewSemester(semester) {
      if (this.semesterAlreadySaved(semester)) {
          return false;
      } else {
          this.semesters.push(semester);
          return true;
      }
  }

  getSemesters() {
      return this.semesters;
  }
}