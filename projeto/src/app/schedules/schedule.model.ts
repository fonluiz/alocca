export class Schedule{
    classId: String;
    weekday: number;
    startTime: number;
    endTime: number;
    constructor(
        classId: string,
        weekday: number,
        startTime: number,
        endTime: number
    ){
        this.classId = classId;
        this.weekday = weekday;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    getClassID(){
        return this.classId;
    }
    getWeekDay(){
        return this.weekday;
    }
    getStartTime(){
        return this.startTime;
    }
    getEndTime(){
        return this.endTime;
    }
}