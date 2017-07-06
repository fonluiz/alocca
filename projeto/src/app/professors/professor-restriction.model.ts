/**
 * @api {model} projeto/src/app/professors/professor-restriction.model.ts Professor Restriction Model
 * @apiName Professor Restriction Model
 * @apiGroup Professor
 * @apiParam {string} SIAPSemester ID compound by professor SIAP's number and current semester
 * @apiParam {number} minCredits Minimum quantity of credits in a semester for a professor.
 * @apiParam {enum} maxCredits Maximum quantity of credits in a semester for a professor.
 * @apiParam {number} posGraduatedCredits Quantity of credits of a professor in a postgraduate teaching.
 * @apiParam {string} scheduleRestrictions List of schedule restrictions associated to a professor.
 */

import { ScheduleRestriction } from "app/professors/schedule-restriction.model";

export class ProfessorRestriction {
    constructor(
        public SIAPSemester: string,
        public minCredits: number,
        public maxCredits: number,
        public posGraduatedCredits: number,
        public scheduleRestrictions: ScheduleRestriction[]
    ) { }

}