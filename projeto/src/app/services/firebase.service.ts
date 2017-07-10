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

  constructor(private db: AngularFireDatabase)  {
    this.allocations = db.list('/allocations') as FirebaseListObservable<Allocation[]>;
    this.professors = db.list('/professors') as FirebaseListObservable<Professor[]>;
    this.courses = db.list('/courses') as FirebaseListObservable<Course[]>;
    this.users = db.list('/users') as FirebaseListObservable<User[]>;
    this.requests = db.list('/requests') as FirebaseListObservable<Request[]>;
    this.semesters = db.list('/semesters') as FirebaseListObservable<Semester[]>;
  }

  ///Allocation
  getAllocations(){
    return this.allocations;
  }
  addAllocation(allocation){
    if(this.allocationExists(allocation.professorOneSIAP+allocation.courseKey)){
      return false;
    }
    else if (allocation.professorTwoSIAP) {
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
    if(this.allocationExists(allocation)){
      if(this.deleteAllocation(id,allocation.oldCourseKey,allocation.classNumber)){
        if(this.addAllocation(allocation)){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }
  }
  deleteAllocation(id,courseKey,allocationClassNumber){
    if(courseKey){
      console.log('inhereee11');
      if(this.updateAllocationsClassNumber(courseKey,allocationClassNumber)){
        console.log('inhereee2222');
        if(this.deleteClass(courseKey)){
          console.log('inhereee4444');
          if (this.allocations.remove(id)){
            console.log('inhereee555');
            return true;
          }else{
            return false;
          }
        }else{
          return false;
        }
      }else{
        return false;
      }
    }else{
      if(this.allocations.remove(id)){
        return true;
      }else{
        return false;
      }
    }
  }
  updateAllocationsClassNumber(courseKey,allocationClassNumber){
    var mayDelete: boolean;
    var thisObject: any = this;
    return this.db.database.ref("allocations/").on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.child('course').val()+childSnapshot.child('courseCredits').val() === courseKey && childSnapshot.child('classNumber').val()>allocationClassNumber) {
            console.log((childSnapshot.child('classNumber').val()) - 1);
            console.log(childSnapshot.key);
            if(thisObject.db.database.ref("allocations/"+childSnapshot.key).update({
              "classNumber": (childSnapshot.child('classNumber').val() - 1)
            })){
              return true;
            }
        }
      });
    });
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
        actualClassesNumber = (snapshot.child('classesNumber').val() + 1);
    });
    if (this.db.database.ref("courses/"+courseKey).update({
        "classesNumber": actualClassesNumber
    }))
    {
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
      newClassesNumber = (snapshot.child('classesNumber').val() - 1);
    });
    if (this.db.database.ref("courses/"+courseKey).update({
        "classesNumber": newClassesNumber
    }))
    {
      return true;
    }
  }
  //CHECK WITH CLIENT
  allocationExists(newAllocationKey){
    var isSaved: boolean;
    this.db.database.ref("allocations/"+newAllocationKey).once("value",function(snapshot){
      isSaved = snapshot.exists();
    });
    return isSaved;
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
            thisObject.deleteAllocation(childSnapshot.key,
                      (childSnapshot.child('course').val()+childSnapshot.child('courseCredits').val()),
                      childSnapshot.child('classNumber').val());
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
    var isSaved:boolean;
    this.db.database.ref("professors/"+newProfessorKey).once("value",function(snapshot){
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
  updateCourse(id, course){
    if(id!==(course.name+course.credits)){
      if(this.courseExists(course.name+course.credits)){
        return false;
      }
      this.deleteCourse(id);
      this.addNewCourse(course);
    }else if(this.courses.update(id,course)){
      return true;
    }else{
      return false;
    }
  }
  deleteCourse(id){
    var thisObject = this;
    this.db.database.ref("allocations/").once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.child('course').val()+childSnapshot.child('courseCredits').val() === id) {
          thisObject.deleteAllocation(childSnapshot.key,null,null);
        }
      });
    });
    return this.courses.remove(id);
  }
  courseExists(newCourseKey){
    var isSaved: boolean;
    this.db.database.ref("courses/"+newCourseKey).once("value",function(snapshot){
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
      if (this.emailAlreadySaved(newUser.name)===newUser.email){
        return false;
      }else{
        this.db.database.ref("users/"+newUser.name).set(newUser);
        return true;
      }

  }
  emailAlreadySaved(newUserKey){
    var userEmail: boolean;
    this.db.database.ref("users/"+newUserKey).once("value",function(snapshot){
      userEmail = snapshot.child('email').val();
    });
    return userEmail;
  }

  ///Requests
  getRequests(){
    return this.requests;
  }
  addNewRequest(newRequest){
    if(this.requestExists(newRequest.name)){
      return false;
    }else{
      this.db.database.ref("requests/"+newRequest.name).set(newRequest);
      return true;
    }
  }
  deleteRequest(id){
    this.requests.remove(id);
  }
  requestExists(newRequestKey){
    var isSaved: boolean;
    this.db.database.ref("requests/"+newRequestKey).once("value",function(snapshot){
      isSaved = snapshot.exists();
    });
    return isSaved;
  }

  ///Semesters
  addNewSemester(newSemester) {
    var isSaved: Boolean = this.semesterExists(newSemester.semesterKey)
    if(this.semesterExists(newSemester.name)){
      return false
    }else{
      this.db.database.ref("semesters/"+(newSemester.semesterKey)).set({
        semester_id: newSemester.semester_id
        //add allocations?
      })
      return true
    }
  }
  getSemesters() {
      return this.semesters;
  }
  semesterExists(newSemesterKey) {
    var isSaved: boolean;
    this.db.database.ref("semesters/"+newSemesterKey).once("value",function(snapshot){
      isSaved = snapshot.exists();
    });
    return isSaved;
  }

}
