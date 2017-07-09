import { ScheduleRestriction } from "app/professors/schedule-restriction.model";

export class ProfessorRestriction {
    constructor(
        //public professorName: string,
        public SIAPSemester: string,
        public minCredits: number,
        public maxCredits: number,
        public posGraduatedCredits: number,
        public scheduleRestrictions: ScheduleRestriction[]
    ) { }

}