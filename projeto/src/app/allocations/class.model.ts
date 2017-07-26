import { Schedule } from './schedule.model';
import { Course } from '../courses/course.model';
import { Professor } from '../professors/professor.model';

export class Class {
        public CAcontrol: boolean;
        public course: Course;
        public number: number;
        public professor1: string;
        public professor2: string;
        public schedules: Schedule[];
        public note: string;
    constructor(
        CAcontrol: boolean,
        course: Course,
        number: number,
        professor1: string,
        professor2: string,
        schedules: Schedule[],
        note: string
    ) {
        this.CAcontrol = CAcontrol;
        this.course = course;
        this.number = number;
        this.professor1 = professor1;
        this.professor2 = professor2;
        this.schedules = schedules;
        this.note = note;
    };

}