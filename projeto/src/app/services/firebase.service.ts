import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import {Professor} from '../professors/professor.model';
import {Course} from '../courses/course.model';
import {Allocation} from '../allocations/allocation.model';
import {User} from '../users/user.model';
import {Request} from '../requests/request.model';
import { Semester } from '../semesters/semester.model';
import { ProfessorRestriction } from '../professors/professor-restriction.model'

@Injectable()
export class FirebaseService {
  ALL_SEMESTERS_PATH = '/allSemesters/ids';
  PROFESSORS_RESTRICTIONS_PATH = '/professorRestrictions/';
  //"local"
  allocations: FirebaseListObservable<any[]>;
  allocation: FirebaseObjectObservable<any>;
  professors: FirebaseListObservable<any[]>;
  professor: FirebaseObjectObservable<any>;
  courses: FirebaseListObservable<any[]>;
  course: FirebaseObjectObservable<any>;
  users: FirebaseListObservable<any[]>;
  usersEmails: FirebaseListObservable<any[]>;
  user: FirebaseObjectObservable<any>;
  requests: FirebaseListObservable<any[]>;
  request: FirebaseObjectObservable<any>;
  requestsEmails: FirebaseListObservable<any[]>;
  semesters: FirebaseListObservable<any[]>;
  professorRestrictions: FirebaseListObservable<any[]>;
  allSemesters: FirebaseObjectObservable<string[]>;

  constructor(private db: AngularFireDatabase)  {
    this.allocations = db.list('/allocations') as FirebaseListObservable<Allocation[]>;
    this.professors = db.list('/professors') as FirebaseListObservable<Professor[]>;
    this.courses = db.list('/courses') as FirebaseListObservable<Course[]>;
    this.users = db.list('/users') as FirebaseListObservable<User[]>;
    this.usersEmails = db.list('/usersEmails') as FirebaseListObservable<any[]>;
    this.requests = db.list('/requests') as FirebaseListObservable<Request[]>;
    this.requestsEmails = db.list('/requestsEmails') as FirebaseListObservable<any[]>;
    this.semesters = db.list('/semesters') as FirebaseListObservable<Semester[]>;
    this.professorRestrictions = db.list(this.PROFESSORS_RESTRICTIONS_PATH) as FirebaseListObservable<ProfessorRestriction[]>;
    this.allSemesters = db.object(this.ALL_SEMESTERS_PATH) as FirebaseObjectObservable<string[]>;
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
        caControl: false,
        course: this.getCourseName(allocation.courseKey),
        courseType: this.getCourseType(allocation.courseKey),
        courseCredits: this.getCourseCredits(allocation.courseKey),
        classNumber: this.getClassesNumber(allocation.courseKey),
        professorOneName: this.getProfessorNameWithSIAP(allocation.professorOneSIAP),
        professorOneSIAP: allocation.professorOneSIAP,
        professorTwoName: this.getProfessorNameWithSIAP(allocation.professorTwoSIAP),
        professorTwoSIAP: allocation.professorTwoSIAP,
        courseOffererDepartment: this.getOffererDepartment(allocation.courseKey),
        courseRequesterDepartment: this.getRequesterDepartment(allocation.courseKey),
        note: allocation.note
      })){
        return true;
      }else{
        return false;
      }
    } else {
      if(this.db.database.ref("allocations/"+allocation.professorOneSIAP+allocation.courseKey).set({
        caControl: false,
        course: this.getCourseName(allocation.courseKey),
        courseType: this.getCourseType(allocation.courseKey),
        courseCredits: this.getCourseCredits(allocation.courseKey),
        classNumber: this.getClassesNumber(allocation.courseKey),
        professorOneName: this.getProfessorNameWithSIAP(allocation.professorOneSIAP),
        professorOneSIAP: allocation.professorOneSIAP,
        courseOffererDepartment: this.getOffererDepartment(allocation.courseKey),
        courseRequesterDepartment: this.getRequesterDepartment(allocation.courseKey),
        note: allocation.note
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
    if(id!=allocation.professorOneSIAP+allocation.courseKey){
      console.log('what??');
      if(this.allocationExists(allocation.professorOneSIAP+allocation.courseKey)){
        console.log('what??2222');
        return false;
      }else{
        if(this.deleteAllocation(id,allocation.oldCourseKey,allocation.classNumber)){
          console.log('what??33333');
          if(this.addAllocation(allocation)){
            console.log('what??4444');
            return true;
          }else{
            return false;
          }
        }else{
          return false;
        }
      }
    }else{
      return false;
    }
  }
  deleteAllocation(id,courseKey,allocationClassNumber){
    if(courseKey){
      if(this.updateAllocationsClassNumber(courseKey,allocationClassNumber)){
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
  changeCAStatus(id,status){
    this.db.database.ref("allocations/"+id).update({
        "caControl": status
    })
  }
  getOffererDepartment(courseKey){
    var department: string = '';
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      department = snapshot.child('offererDepartment').val();
    })
    return department;
  }
  getRequesterDepartment(courseKey){
    var department: string = '';
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      department = snapshot.child('requesterDepartment').val();
    })
    return department;
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
    this.db.database.ref("allocations/").on("value",function(snapshot) {
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
          if(thisObject.deleteAllocation(childSnapshot.key,null,null)){
            if(thisObject.addAllocation(allocation)){
              return true;
            }
          }else{
            return false;
          }
        }else if(childSnapshot.child('professorTwoSIAP').val() === id){
          let allocation = {
            courseKey: childSnapshot.child('course').val()+childSnapshot.child('courseCredits').val(),
            professorOneSIAP: childSnapshot.child('professorOneSIAP').val()
          };
          if (thisObject.deleteAllocation(childSnapshot.key,null,null)){
            if(thisObject.addAllocation(allocation)){
              return true;
            }else{
              return false;
            }
          }else{
            return false;
          }
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
    this.db.database.ref("allocations/").on("value",function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.child('course').val()+childSnapshot.child('courseCredits').val() === id) {
          if (thisObject.deleteAllocation(childSnapshot.key,
                      (childSnapshot.child('course').val()+childSnapshot.child('courseCredits').val()),
                      childSnapshot.child('classNumber').val())){
                        return true;
                      }
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
  getUsersEmails(){
    return this.usersEmails;
  }
  deleteUser(user){
    var thisObject = this;
    if(this.users.remove(user.$key)){
      this.db.database.ref("usersEmails/").on("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(childSnapshot.child('email').val()===user.email){
            thisObject.usersEmails.remove(childSnapshot.key);
            return true;
          }
        })
      })
    }
  }
  addNewUser(newUser){
      if (this.emailAlreadySaved(newUser.SIAP)){
        return false;
      }else{
        this.db.database.ref("users/"+newUser.SIAP).set(newUser);
        return true;
      }

  }
  emailAlreadySaved(newUserKey){
    var userEmail: boolean;
    this.db.database.ref("users/"+newUserKey).once("value",function(snapshot){
      userEmail = snapshot.exists();
    });
    return userEmail;
  }
  isUserRegistered(userEmail){
    var isRegistered: boolean = false;
    this.db.database.ref("usersEmails/").on("value",function(snapshot){
      snapshot.forEach(function(childSnapshot){
        if(childSnapshot.child('email').val()===userEmail){
          isRegistered = true;
          return true;
        }
      });
    });
    return isRegistered;
  }

  ///Requests
  getRequests(){
    return this.requests;
  }
  getRequestsEmails(){
    return this.requestsEmails;
  }
  addNewRequest(newRequest){
    if(this.requestExists(newRequest.email)){
      return false;
    }else{
      this.db.database.ref("requests/"+newRequest.SIAP).set(newRequest);
      this.requestsEmails.push({
        email: newRequest.email
      });
      return true;
    }
  }
  acceptRequest(request){
    if(this.addNewUser(request)){
      this.deleteRequest(request);
    }
  }
  deleteRequest(request){
    var thisObject = this;
    if(this.requests.remove(request.$key)){
      this.db.database.ref("requestsEmails/").on("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(childSnapshot.child('email').val()===request.email){
            thisObject.requestsEmails.remove(childSnapshot.key);
            return true;
          }
        })
      })
    }
  }
  requestExists(requestEmail){
    var isRegistered: boolean = false;
    this.db.database.ref("requestsEmails/").on("value",function(snapshot){
      snapshot.forEach(function(childSnapshot){
        if(childSnapshot.child('email').val()===requestEmail){
          isRegistered = true;
          return true;
        }
      });
    });
    return isRegistered;
  }

  ///Semesters
  // Salva um novo semestre na lista de semestres
  saveSemester(semester: Semester) {
      this.db.database.ref('semesters/' + semester.getId())
          .set(semester.toFirebaseObject());
  }
  // Adiciona um Id de semeste à lista de todos os Ids de semestres
  addSemester(semesterId: String) {
      var self = this;
      this.db.database.ref(this.ALL_SEMESTERS_PATH).once('value')
          .then(function (snapshot) {
              var semestersIds = snapshot.val() as String[];
              if (semestersIds == null) {
                  self.allSemesters.set([semesterId]);
              } else if (semestersIds.indexOf(semesterId) < 0) {
                  semestersIds.push(semesterId);
                  self.allSemesters.set(semestersIds);
              }
          });
  }
  getSemesters() {
      return this.semesters;
  }
  getSemestersIds() {
      return this.allSemesters;
  }

  // Restrictions
  getProfessorRestrictions() {
      return this.professorRestrictions;
  }

  saveProfessorRestriction(restriction: ProfessorRestriction) {
      this.db.database.ref(this.PROFESSORS_RESTRICTIONS_PATH + restriction.getSIAPSemester())
          .set(restriction.toFirebaseObject());
  }

}