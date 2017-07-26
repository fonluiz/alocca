import { Schedule } from './schedule.model';
import { Course } from '../courses/course.model';
import { Professor } from '../professors/professor.model';

export class Class {

    private isVerified: boolean;

    constructor(
        private course: Course,
        private number: number,
        private professor1: string,
        private professor2: string,
        private schedules: Schedule[],
        private note: string
    ) {
        this.isVerified = false;
    };

}