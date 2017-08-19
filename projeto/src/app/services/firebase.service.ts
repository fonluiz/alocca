import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Professor } from '../professors/professor.model';
import { Course } from '../courses/course.model';
import { User } from '../users/user.model';
import { Request } from '../requests/request.model';
import { Semester } from '../semesters/semester.model';
import { ProfessorRestriction } from '../professors/professor-restriction.model';
import { Class } from '../classes/class.model';
import { NavbarService } from "./navbar.service";

@Injectable()
export class FirebaseService {
  CLASSES_PATH = '/classes';
  SEMESTERS_PATH = '/semesters';
  PROFESSORS_RESTRICTIONS_PATH = '/professorRestrictions/';
  //"local"
  classes: FirebaseListObservable<any[]>;
  class_: FirebaseObjectObservable<any>;
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
  private currentSemester: string;
  
  constructor(private db: AngularFireDatabase,
              private  navbarService: NavbarService)  {
    this.professors = db.list('/professors') as FirebaseListObservable<Professor[]>;
    this.courses = db.list('/courses') as FirebaseListObservable<Course[]>;
    this.users = db.list('/users') as FirebaseListObservable<User[]>;
    this.usersEmails = db.list('/usersEmails') as FirebaseListObservable<any[]>;
    this.requests = db.list('/requests') as FirebaseListObservable<Request[]>;
    this.requestsEmails = db.list('/requestsEmails') as FirebaseListObservable<any[]>;
    this.semesters = db.list(this.SEMESTERS_PATH) as FirebaseListObservable<any[]>;
    this.professorRestrictions = db.list(this.PROFESSORS_RESTRICTIONS_PATH) as FirebaseListObservable<ProfessorRestriction[]>;
    this.classes = db.list('/classes') as FirebaseListObservable<Class[]>;

    this.navbarService.getSemesterSelectedEmitter().subscribe(sem => {
      this.currentSemester = sem;
      this.classes = db.list(this.CLASSES_PATH + '/' + this.currentSemester) as FirebaseListObservable<Class[]>;
    })
  }

//Classes
  updateClass(id, classToUpdate){
    if (classToUpdate.professor1SIAPE===classToUpdate.professor2SIAPE){
      this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor2')
      .set("");
      this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor2SIAPE')
      .set("");
    }else{
      this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor2')
      .set(classToUpdate.professor2);
      this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor2SIAPE')
      .set(classToUpdate.professor2SIAPE);
    }
    this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor1')
    .set(classToUpdate.professor1);
    this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor1SIAPE')
    .set(classToUpdate.professor1SIAPE);
    this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/note')
    .set(classToUpdate.note);
  }
  saveClass(classToSave: Class) {
    var classRef = this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + classToSave.getId());
    var detailedCourse: any;
    this.getCourseDetails(classToSave.getCourse()).subscribe(course_ => {
      detailedCourse = course_;
    })
    var recomendedSemester: string = "";
    if(detailedCourse.minimumSemester!==detailedCourse.maximumSemester){
      recomendedSemester = detailedCourse.minimumSemester+"-"+detailedCourse.maximumSemester;
    }else{
      recomendedSemester = detailedCourse.minimumSemester;
    }
    classRef.update({
      "isVerified":false,
      "recomendedSemester":recomendedSemester,
      "course":detailedCourse.shortName,
      "number":classToSave.getNumber(),
      "professor1":"",
      "professor2":"",
      "schedules":{
        "monday":{
          "hours":""
        },
        "tuesday":{
          "hours":""
        },
        "wednesday":{
          "hours":""
        },
        "thursday":{
          "hours":""
        },
        "friday":{
          "hours":""
        }
      },
      "hoursToSchedule": detailedCourse.hoursToSchedule,
      "note":""
    })
    // Only saves the data if it does not exists already
   classRef.once('value').then(
      function(snapshot) {
        if (snapshot.val() == null) {
          classRef.set(classToSave.toFirebaseObject());
          return true;
        } else {
          return false;
        }
      }
    );
  }
  getClasses() {
    let classesList = this.db.list('/classes/'+this.currentSemester) as FirebaseListObservable<any[]>;
    return classesList;
  }
  getClassDetails(id){
    this.class_ = this.db.object('/classes/'+this.currentSemester+'/'+id) as FirebaseObjectObservable<Class>;
    return this.class_;
  }
  private addClassToSemester(classId: string) {
    var semester = this.db.database.ref(this.SEMESTERS_PATH + '2017-2');
    semester.transaction(
      function(snapshot) {
        if (snapshot.noDataYet) {
          return {classes: [classId]};
        } else {
          var classes = snapshot.classes as string[];
          classes.push(classId);
          snapshot.classes = classes;
          return snapshot;
        }
      }
    );
  }
  getProfessorNameWithSIAPE(professorSIAPE) {
    var professorName: String = "-";
    this.db.database.ref("professors/"+professorSIAPE).once("value", function(snapshot){
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
    this.classes.remove(courseKey);
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
    if(this.professorExists(newprofessor.SIAPE)){
        return false;
    }else{
      this.db.database.ref("professors/"+newprofessor.SIAPE).set(newprofessor);
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
  updateProfessor(id, professor,oldProfessor){
    if (id!==professor.SIAPE){
      if(this.professorExists(professor.SIAPE)){
        return false;
      }
      this.deleteProfessor(id);
      this.addNewProfessor(professor);
      this.updateProfessorInClassesTable(professor,oldProfessor);
      return true;
    }else if(this.professors.update(id,professor)){
      this.updateProfessorInClassesTable(professor,oldProfessor);
      return true;
    }
  }
  updateProfessorInClassesTable(professor,oldProfessor){
    var thisObject = this;
    var semests: any[];
    this.getSemesters().subscribe(sems => {
      semests = sems;
    })
    semests.forEach(function(sem){
      var rightclasses = []
      thisObject.db.list('/classes/'+sem.$key).subscribe(Rclasses=>{
        rightclasses = Rclasses;
      })
      rightclasses.forEach(function(thatClass){
        if(thatClass.professor1SIAPE == oldProfessor.SIAPE){
          console.log('entrou no 1')
          thisObject.db.database.ref('/classes/'+sem.$key+'/'+thatClass.$key).update({
            "professor1":professor.nickname,
            "professor1SIAPE":professor.SIAPE
          });
        }
        else if(thatClass.professor2SIAPE == oldProfessor.SIAPE){
          console.log('entrou no 2')
          thisObject.db.database.ref('/classes/'+sem.$key+'/'+thatClass.$key).update({
            "professor2":professor.nickname,
            "professor2SIAPE":professor.SIAPE
          });
        }
      })
    })
  }
  deleteProfessor(id){
    if(this.professors.remove(id)){
      return true;
    }else{
      return false;
    }
    
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
    if(this.courseExists(newCourse.code)){
      return false;
    }else{
      this.db.database.ref("courses/"+newCourse.code).set(newCourse);
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
  updateCourse(id, course, oldName){
    if(id!==(course.code)){
      if(this.courseExists(course.code)){
        return false;
      }
      this.deleteCourse(id);
      this.addNewCourse(course);
      this.updateCourseInClassesTable(course,oldName);
      return true;
    }else if(this.courses.update(id,course)){
      this.updateCourseInClassesTable(course,oldName);
      return true;
    }else{
      return false;
    }
  }
  updateCourseInClassesTable(course,oldName){
    var thisObject = this;

    var recomends: string = "";
    if(course.minimumSemester!==course.maximumSemester){
      recomends = course.minimumSemester+"-"+course.maximumSemester;
    }else{
      recomends = course.minimumSemester;
    }

    var semests: any[];
    this.getSemesters().subscribe(sems => {
      semests = sems;
      semests.forEach(function(sem){
        var rightclasses = []
        thisObject.db.list('classes/'+sem.$key).subscribe(Rclasses=>{
          rightclasses = Rclasses;
          console.log(rightclasses);
          rightclasses.forEach(function(thatClass){
            console.log(thatClass.course);
            if(thatClass.course === oldName){
              console.log('entrou no 1')
              thisObject.db.database.ref("classes/"+sem.$key+'/'+thatClass.$key).update({
                "course":course.shortName,
                "hoursToSchedule":course.hoursToSchedule,
                "recomendedSemester": recomends
              });
            }
          })
        })
      })
    })
  }
  deleteCourse(id){
    if (this.courses.remove(id)){
      return true;
    }else{
      return false;
    }
  }
  courseExists(newCourseKey){
    var isSaved: boolean;
    this.db.database.ref("courses/"+newCourseKey).on("value",function(snapshot){
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
      if(this.db.database.ref("usersEmails/").on("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(childSnapshot.child('email').val()===user.email){
            thisObject.usersEmails.remove(childSnapshot.key);
            return true;
          }
        });
      })){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  addNewUser(newUser){
      if (this.emailAlreadySaved(newUser.SIAPE)){
        return false;
      }else{
        if(this.db.database.ref("users/"+newUser.SIAPE).set(newUser)){
          if(this.usersEmails.push({email: newUser.email})){
            return true;
          }
        }
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
      this.db.database.ref("requests/"+newRequest.SIAPE).set(newRequest);
      this.requestsEmails.push({
        email: newRequest.email
      });
      return true;
    }
  }
  acceptRequest(request){
    if(this.addNewUser(request)){
      if(this.deleteRequest(request)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  deleteRequest(request){
    var thisObject = this;
    if(this.requests.remove(request.$key)){
      if(this.db.database.ref("requestsEmails/").on("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(childSnapshot.child('email').val()===request.email){
            thisObject.requestsEmails.remove(childSnapshot.key);
            return true;
          }
        });
      })){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
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

// Semesters
  /**
   * 
   * @param semester 
   * New (object) Semester to be saved.
   * 
   * @returns Status of the semester to be saved
   */
  saveSemester(semester: Semester): boolean {
      this.db.database.ref(this.SEMESTERS_PATH + '/' + semester.getId())
          .set(semester.toFirebaseObject());
      this.navbarService.emitSemesterSelected(semester.getId());
      return true;
  }

  /**
   * 
   * @returns List of available semesters from firebase.
   */
  getSemesters(): FirebaseListObservable<any[]> {
      return this.semesters;
  }

  /**
   * 
   * @returns Current selected semester.
   */
  getCurrentSemester(): string{
    return this.currentSemester;
  }

  /**
   * 
   * @param id 
   * ID of the semester to be deleted.
   * 
   * @returns {boolean}
   * Status of the operation: true if deleted.
   */
  removeSemester(id: string): boolean {
    if (this.semesters.remove(id)){
      return true;
    }else{
      return false;
    }
  }

// Restrictions
  getProfessorRestrictionsList() {
      return this.professorRestrictions;
  }

  saveProfessorRestriction(restriction: ProfessorRestriction) {
      this.db.database.ref(this.PROFESSORS_RESTRICTIONS_PATH + restriction.getSIAPESemester())
          .set(restriction.toFirebaseObject());
  }

  getProfessorRestrictions(restriction_id: string) {
      return this.db.object(this.PROFESSORS_RESTRICTIONS_PATH + restriction_id) as FirebaseObjectObservable<ProfessorRestriction>;
  }

//Schedules

  /**
   * 
   * @param classKey The key of the class that will be added
   * @param day The day in the schedule of the class that will be added
   * @param hour The hour in the schedule of the class that will be added
   * 
   * @example addClassToSchedule('LES-1','monday',7)
   * 
   * @returns status of the addition: true if class scheduled
   */
  addClassToSchedule(classKey:string,day: string,hour: number): boolean{
    var daySchedulesList: any[] = [];
    var alreadyScheduled: boolean = false;
    this.db.database.ref("classes/"+this.currentSemester+"/"+classKey+'/schedules/'+day+'/hours')
    .on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        daySchedulesList.push(childSnapshot.val());
        if(childSnapshot.val()===hour){
          alreadyScheduled = true;
        }
        if(!daySchedulesList){
          return  true;
        }
      })
    })
    if (!alreadyScheduled){
      daySchedulesList.push(hour);
      if(this.db.database.ref("classes/"+this.currentSemester+"/"+classKey+'/schedules/'+day+'/hours').set(daySchedulesList)){
        this.updateHoursToSchedule(classKey,hour,true);
        return true;
      }
    }else{
      return false;
    }
  }

  /**
   * 
   * @param classKey The key of the class that will be deleted
   * @param day The day in the schedule of the class that will be deleted
   * @param hour The hour in the schedule of the class that will be deleted
   * 
   * @example deleteClassFromSchedule('LES-1','monday',7)
   * 
   * @returns {boolean} status of the deletion: true if class unscheduled
   */
  deleteClassFromSchedule(classKey:string,day:string,hour:number): boolean{
    var hoursFromClass: any[] = [];
    this.db.database.ref("classes/"+this.currentSemester+"/"+classKey+'/schedules/'+day+'/hours')
    .on("value",function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.val()!==hour){
          hoursFromClass.push(childSnapshot.val());
        }
        if(hoursFromClass===null){
          return  true;
        }
      })
    })
    if(hoursFromClass.length===0){
      hoursFromClass.push("");
    }
    if(this.db.database.ref("classes/"+this.currentSemester+"/"+classKey+'/schedules/'+day+'/hours')
    .set(hoursFromClass)){
      this.updateHoursToSchedule(classKey,hour,false)
      return true;
    }else{
      return false;
    }
  }

  /**
   * 
   * @param classKey The key of the class
   * @param hour The hour in the schedule of the class
   * @param isAdd Is the method being used when a class is being scheduled or unscheduled
   * 
   * @example pdateHoursToSchedule('LES-1',8,true)
   * 
   * @return {boolean} status of the update: true if succesfull
   */
  private updateHoursToSchedule(classKey: string, hour: number, isAdd: boolean): boolean{
    var thisObject = this;
    var hourToAddOrSubtract:number = 0;
    var oldHours: number;
    var newHours: number;
    if(isAdd){
      if(hour===7){
        hourToAddOrSubtract = -1;
      }else{
        hourToAddOrSubtract = -2;
      }
    }else{
      if(hour===7){
        hourToAddOrSubtract = 1;
      }else{
        hourToAddOrSubtract = 2;
      }
    }
    if (this.db.database.ref("classes/"+this.currentSemester+"/"+classKey)
      .on("value", function(snapshot){
        oldHours = snapshot.child('hoursToSchedule').val();
      }))
    {
      newHours = oldHours + hourToAddOrSubtract;
      this.db.database.ref("classes/"+this.currentSemester+"/"+classKey+'/hoursToSchedule').set(newHours);
      return true;
    }else{
      return false;
    }

  }
}