import { Schedule } from './schedule.model';

export class ClassesStub{
    constructor(){}

    getSchedules(){
        let scheduleOne = new Schedule('TurmaSegunda10Quarta08',2,10,12);
        let scheduleTwo = new Schedule('TurmaTerca14',3,14,16);
        let scheduleThree = new Schedule('TurmaQuarta08',4,8,10);
        let scheduleFour = new Schedule('TurmaQuinta16',5,16,18);
        let scheduleFive = new Schedule('TurmaSexta07',6,7,10);
        let scheduleSix = new Schedule('TurmaSegunda10Quarta08',4,8,10);

        let schedules: Schedule[];
        schedules = [
            scheduleOne,
            scheduleTwo,
            scheduleThree,
            scheduleFour,
            scheduleFive,
            scheduleSix];

        return schedules;
    }
}