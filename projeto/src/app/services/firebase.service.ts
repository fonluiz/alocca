import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import {Professor} from '../professors/professor.model';
import {Course} from '../courses/course.model';
import { Allocation } from '../allocations/allocation.model';
import { Semester } from '../semesters/semester.model';
import { ProfessorRestriction } from '../professors/professor-restriction.model'

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
    professorRestrictions: FirebaseListObservable<any[]>;

    constructor(private db: AngularFireDatabase) {
        this.allocations = db.list('/allocations') as FirebaseListObservable<Allocation[]>;
        this.professors = db.list('/professors') as FirebaseListObservable<Professor[]>;
        this.courses = db.list('/courses') as FirebaseListObservable<Course[]>;
        this.semesters = db.list('/semesters') as FirebaseListObservable<Semester[]>;
        this.professorRestrictions = db.list('/professorRestrictions') as FirebaseListObservable<ProfessorRestriction[]>;
    }

    getAllocations() {
        return this.allocations;
    }
    addAllocation(allocation) {
        return this.allocations.push(allocation);
    }
    getAllocationDetails(id) {
        this.allocation = this.db.object('/allocations/' + id) as FirebaseObjectObservable<Allocation>;
        return this.allocation;
    }
    updateAllocation(id, allocation) {
        return this.allocations.update(id, allocation);
    }
    deleteAllocation(id) {
        return this.allocations.remove(id);
    }

    addNewProfessor(newprofessor) {
        if (this.sameSIAPProfessor(newprofessor)) {
            return false;
        } else {
            this.professors.push(newprofessor);
            return true;
        }
    }
    getProfessors() {
        return this.professors;
    }
    getProfessorDetails(id) {
        this.professor = this.db.object('/professors/' + id) as FirebaseObjectObservable<Professor>
        return this.professor;
    }
    updateProfessor(id, professor) {
        if (!(this.sameSIAPProfessor(professor))) {
            return false;
        }
        return this.professors.update(id, professor);
    }
    deleteProfessor(id) {
        return this.professors.remove(id);
    }
    sameSIAPProfessor(newProfessor) {
        var retorn: Boolean = false;
        this.getProfessors().subscribe(professors => {
            professors.forEach(element => {
                if (element.SIAP == newProfessor.SIAP) {
                    retorn = true;
                } else {
                }
            });
        });
        return retorn;
    }

    addNewCourse(course) {
        return this.courses.push(course);
    }
    getCourses() {
        return this.courses;
    }
    getCourseDetails(id) {
        this.course = this.db.object('/courses/' + id) as FirebaseObjectObservable<Course>
        return this.course;
    }
    updateCourse(id, course) {
        return this.courses.update(id, course);
    }
    deleteCourse(id) {
        return this.courses.remove(id);
    }

    addNewSemester(semester) {
        var semesterRef = this.db.database.ref('/semesters/' + semester.semester_id);
        console.log(semesterRef);
        semesterRef.set({
            //TODO: This is unnecessary and will be deleted on next commit
            semester_id: semester.semester_id.replace('_', '.')
        });
    }

    getSemesters() {
        return this.semesters;
    }

    getProfessorRestrictions() {
        return this.professorRestrictions;
    }

    saveProfessorRestriction(restriction: ProfessorRestriction) {        
        this.db.database.ref('professorRestrictions/' + restriction.SIAPSemester)
        .set(restriction.getFirebaseObject());
    }
}