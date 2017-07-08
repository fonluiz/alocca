import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import {Professor} from '../professors/professor.model';
import {Course} from '../courses/course.model';
import {Allocation} from '../allocations/allocation.model';
import {User} from '../users/user.model';
import {Request} from '../requests/request.model';
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
  users: FirebaseListObservable<any[]>;
  user: FirebaseObjectObservable<any>;
  requests: FirebaseListObservable<any[]>;
  request: FirebaseObjectObservable<any>;
  semesters: FirebaseListObservable<any[]>;
  semester: FirebaseObjectObservable<any>;
  dbRef: any;

  constructor(private db: AngularFireDatabase) {
    this.allocations = db.list('/allocations') as FirebaseListObservable<Allocation[]>;
    this.professors = db.list('/professors') as FirebaseListObservable<Professor[]>;
    this.courses = db.list('/courses') as FirebaseListObservable<Course[]>;
    this.users = db.list('/users') as FirebaseListObservable<User[]>;
    this.requests = db.list('/requests') as FirebaseListObservable<Request[]>;
    this.semesters = db.list('/semesters') as FirebaseListObservable<Semester[]>;
    this.dbRef = db.database.ref();
  }

  ///Allocation
  getAllocations(){
    return this.allocations;
  }
  addAllocation(allocation){
    if (allocation.professorTwoSIAP) {
      if(this.db.database.ref("allocations/"+allocation.professorOneSIAP+allocation.courseKey).set({
          course: this.getCourseName(allocation.courseKey),
          courseType: this.getCourseType(allocation.courseKey),
          courseCredits: this.getCourseCredits(allocation.courseKey),
          classNumber: this.getClassesNumber(allocation.courseKey),
          professorOneName: this.getProfessorNameWithSIAP(allocation.professorOneSIAP),
          professorOneSIAP: allocation.professorOneSIAP,
          professorTwoName: this.getProfessorNameWithSIAP(allocation.professorTwoSIAP),
          professorTwoSIAP: allocation.professorTwoSIAP
          //add note field
        })){
        return true;
      }else{
        return false;
      }
    } else {
      if(this.db.database.ref("allocations/"+allocation.professorOneSIAP+allocation.courseKey).set({
          course: this.getCourseName(allocation.courseKey),
          courseType: this.getCourseType(allocation.courseKey),
          courseCredits: this.getCourseCredits(allocation.courseKey),
          classNumber: this.getClassesNumber(allocation.courseKey),
          professorOneName: this.getProfessorNameWithSIAP(allocation.professorOneSIAP),
          professorOneSIAP: allocation.professorOneSIAP
          //add note field
        })){
        return true;
      }else{
        return false;
      }
    }
  }
  getAllocationDetails(id){
    this.allocation = this.db.object('/allocations/'+id) as FirebaseObjectObservable<Allocation>;
    return this.allocation;
  }
  updateAllocation(id,allocation){
      if(this.deleteAllocation(id,allocation.courseKey)){
      //is it more efficient like this? or setting all the date before?
        if (this.addAllocation(allocation)){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
  }
  deleteAllocation(id,courseKey){
    //change (or not) after checking with client
    if(this.deleteClass(courseKey)){
      if (this.allocations.remove(id)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  getProfessorNameWithSIAP(professorSIAP) {
    var professorName: String = "-";
    this.db.database.ref("professors/"+professorSIAP).once("value", function(snapshot){
      professorName = snapshot.child('name').val();
    });
    return professorName;
  }
  getClassesNumber(courseKey){
    var actualClassesNumber: number;
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      if (snapshot.exists()){
        actualClassesNumber = snapshot.child('classesNumber').val() + 1;
      }
    });
    if (this.db.database.ref("courses/"+courseKey).update({
        "classesNumber": actualClassesNumber
    })){
      return actualClassesNumber;
    }
  }
  getCourseName(courseKey){
    var name: string = '';
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      name = snapshot.child('name').val();
    })
    return name;
  }
  getCourseType(courseKey){
    var type: string = '';
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      type = snapshot.child('type').val();
    })
    return type;
  }
  getCourseCredits(courseKey){
    var credits: string = '';
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      credits = snapshot.child('credits').val();
    })
    return credits;
  }
  deleteClass(courseKey){
    var newClassesNumber:number;
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      newClassesNumber = (snapshot.child('classesNumber').val())-1;
    })
    return this.db.database.ref("courses/"+courseKey).update({
        "classesNumber": newClassesNumber
    });
  }

  ///Professors
  addNewProfessor(newprofessor){
    if(this.professorExists(newprofessor.SIAP)){
        return false;
    }else{
      this.db.database.ref("professors/"+newprofessor.SIAP).set(newprofessor);
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
    if (id!==professor.SIAP){
      if(this.professorExists(professor.SIAP)){
        return false;
      }
      this.deleteProfessor(id,professor.name);
      this.addNewProfessor(professor);
    }else if(this.professors.update(id,professor)){
      return true;
    }else{
      return false;
    }
  }
  deleteProfessor(id, professorName){
    var thisObject = this;
    this.db.database.ref("allocations/").once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.child('professorOneSIAP').val() === id && !childSnapshot.child('professorTwoSIAP').val()){
            thisObject.deleteAllocation(childSnapshot.key,(childSnapshot.child('course').val()+childSnapshot.child('courseCredits').val()));
        }else if(childSnapshot.child('professorOneSIAP').val() === id){
          let allocation = {
            courseKey: childSnapshot.child('course').val()+childSnapshot.child('courseCredits').val(),
            professorOneSIAP: childSnapshot.child('professorTwoSIAP').val()
          };
          thisObject.updateAllocation(childSnapshot.key,allocation);
        }else if(childSnapshot.child('professorTwoSIAP').val() === id){
          let allocation = {
            courseKey: childSnapshot.child('course').val()+childSnapshot.child('courseCredits').val(),
            professorOneSIAP: childSnapshot.child('professorOneSIAP').val()
          };
          thisObject.updateAllocation(childSnapshot.key,allocation);
        }
      });
    });
    return this.professors.remove(id);
    
  }
  professorExists(newProfessorKey){
    var isSaved: boolean = false;
    this.db.database.ref("professors/"+newProfessorKey).once("value", function(snapshot) {
      isSaved = snapshot.exists();
    });
    return isSaved;
  }

  ///Courses
  addNewCourse(newCourse){
    if(this.courseExists(newCourse.name+newCourse.credits)){
      return false;
    }else{
      this.db.database.ref("courses/"+newCourse.name+newCourse.credits).set(newCourse);
      return true;
    }
  }
  getCourses(){
    return this.courses;
  }
  getCourseDetails( id){
    this.course = this.db.object('/courses/'+id) as FirebaseObjectObservable<Course>
    return this.course;
  }
  //things to change in here!!
  updateCourse(id, course){
    if(id!==(course.name+course.credits)){
      if(this.courseExists(course.name+course.credits)){
        return false;
      }
      //change this after changing allocation
      this.deleteCourse(id,course.name);
    }
    if(this.courses.update((course.name+course.credits),course)){
      return true;
    }else{
      return false;
    }
  }
  //change allocation first
  deleteCourse(id, courseName){
    this.getAllocations().subscribe(allocations => {
      allocations.forEach(element => {
        if (element.course === courseName) {
         // this.deleteAllocation(element.$key);
        }
      });
    });
    return this.courses.remove(id);
  }
  courseExists(newCourseKey){
    var isSaved: boolean = false;
    this.db.database.ref("courses/"+newCourseKey).once("value", function(snapshot) {
      isSaved = snapshot.exists();
    });
    return isSaved;
  }

  ///Users
  getUsers(){
    return this.users;
  }
  deleteUser(id){
    return this.users.remove(id);
  }
  addNewUser(newUser){
    var isEmailAlreadySaved: Boolean = this.emailAlreadySaved(newUser);
    if (isEmailAlreadySaved===true){
      return false;
    }
    else if(isEmailAlreadySaved===false){
      this.users.push(newUser);
      return true;
    }
    
  }
  ///change to avoid duble values in the firebase system
  emailAlreadySaved(newUser){
    var sameEmail: Boolean = false;
    var executionOrder: Boolean = false;
    this.getUsers().subscribe(users =>{
      users.forEach(element => {
        executionOrder = true;
        if (element.email == newUser.email) {
          sameEmail= true;
        }
      });
    });
    if(executionOrder){
      return sameEmail;
    }
  } 

  ///Requests
  getRequests(){
    this.requests = this.db.list('/requests') as FirebaseListObservable<Request[]>;
    return this.requests;
  }
  ///change to avoid duble values in the firebase system
  addNewRequest(request){
    this.requests.push(request);
    return true;
  }
  deleteRequest(id){
    this.requests.remove(id);
  }

  ///Semesters
  addNewSemester(semester) {
        var isAlreadySaved: Boolean = this.semesterAlreadySaved(semester);
        if (!isAlreadySaved) {
            this.semesters.push(semester);
            return true;
        } else {
            return false;
        }
  }
  getSemesters() {
      return this.semesters;
  }
  ///change to avoid duble values in the firebase system
  semesterAlreadySaved(semester) {
        var isSaved: Boolean = false;
        this.getSemesters().subscribe(semesters => {
            semesters.forEach(element => {
                if (element.semester_id === semester.semester_id) {
                    isSaved = true;
                }
            });
        });
        return isSaved;
  }

}
