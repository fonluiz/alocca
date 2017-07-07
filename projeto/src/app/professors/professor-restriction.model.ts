/**
 * @api {model} projeto/src/app/professors/professor-restriction.model.ts Professor Restriction Model
 * @apiName Professor Restriction Model
 * @apiGroup Professor
 * @apiParam {string} SIAPSemester ID compound by professor SIAP's number and current semester
 * @apiParam {number} minCredits Minimum quantity of credits in a semester for a professor.
 * @apiParam {enum} maxCredits Maximum quantity of credits in a semester for a professor.
 * @apiParam {number} graduatedCredits Quantity of credits of a professor in a graduate teaching.
 * @apiParam {string} scheduleRestrictions List of schedule restrictions associated to a professor.
 */

import { ScheduleRestriction } from "app/professors/schedule-restriction.model";

export class ProfessorRestriction {
    constructor(
        public SIAPSemester: string,
        public minCredits: number,
        public maxCredits: number,
        public graduateCredits: number,
        public scheduleRestrictions: ScheduleRestriction
    ) { }

    getFirebaseObject() {
       var firebaseObject: any = {
           'minCredits': this.minCredits,
           'maxCredits': this.maxCredits,
           'graduateCredits': this.graduateCredits,
           'scheduleRestrictions': this.scheduleRestrictions
       };
       return <JSON>firebaseObject;
    }

}