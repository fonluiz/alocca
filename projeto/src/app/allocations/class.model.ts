import { Schedule } from './schedule.model';
import { Course } from '../courses/course.model';
import { Professor } from '../professors/professor.model';

export class Class {

    private id: string;
    private verified: boolean;
    private professor1: string;
    private professor2: string;
    private schedules: Schedule[];
    private note: string;

    constructor(
        private course: string,
        private number: number
    ) {
        this.id = course + '-' + number;
        this.verified = false;
        this.professor1 = null;
        this.professor2 = null;
        this.schedules = null;
        this.note = null;
    };

    getId() {
        return this.id;
    }

    getCourse() {
        return this.course;
    }

    getNumber() {
        return this.number;
    }

    isVerified() {
        return this.verified;
    }

    getProfessor1() {
        return this.professor1;
    }

    getProfessor2() {
        return this.professor2;
    }

    getSchedules() {
        return this.schedules;
    }

    getNote() {
        return this.note;
    }

    toFirebaseObject() {
        var firebaseObject: any = {
            verified: this.verified,
            course: this.course,
            number: this.number,
            professor1: this.professor1,
            professor2: this.professor2,
            schedules: this.schedules,
            note: this.note
        }
        return <JSON>firebaseObject;
    }


}