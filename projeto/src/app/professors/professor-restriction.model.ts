import { ScheduleRestriction } from "app/professors/schedule-restriction.model";

export class ProfessorRestriction {
    constructor(
        private SIAPSemester: string,
        private minCredits: number,
        private maxCredits: number,
        private graduateCredits: number,
        private scheduleRestrictions: ScheduleRestriction
    ) { }

    getSIAPSemester() {
        return this.SIAPSemester;
    }

    setSIAPSemester(newSIAPSemester: string) {
        this.SIAPSemester = newSIAPSemester;
    }

    getMinCredits() {
        return this.minCredits;
    }

    setMinCredits(newMinCredits: number) {
        this.minCredits = newMinCredits;
    }

    getMaxCredits() {
        return this.maxCredits;
    }

    setMaxCredits(newMaxCredits: number) {
        this.minCredits = newMaxCredits;
    }

    getGraduateCredits() {
        return this.graduateCredits;
    }

    setGraduateCredits(newGraduateCredits: number) {
        this.graduateCredits = newGraduateCredits;
    }

    getScheduleRestrictions() {
        return this.scheduleRestrictions;
    }

    setScheduleRestrictions(newScheduleRestrictions: ScheduleRestriction) {
        this.scheduleRestrictions = newScheduleRestrictions;
    }

    toFirebaseObject() {
       var firebaseObject: any = {
           'minCredits': this.minCredits,
           'maxCredits': this.maxCredits,
           'graduateCredits': this.graduateCredits,
           'scheduleRestrictions': this.scheduleRestrictions
       };
       return <JSON>firebaseObject;
    }
}