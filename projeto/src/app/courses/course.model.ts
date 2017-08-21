export class Course {
    constructor(
        private code: string,
        private name: string,
        private shortName: string,
        private credits: number,
        private hoursToSchedule: number,
        private type: string,
        private minimumSemester: number,
        private maximumSemester: number,
        private offererDepartment: string,
        private requesterDepartment: string
    ) {}

    getCode(): string{
        return this.code;
    }

    getName(): string{
        return this.name;
    }

    getShortName(): string{
        return this.shortName;
    }

    getCredits(): number{
        return this.credits;
    }

    getHoursToSchedule(): number{
        return this.hoursToSchedule;
    }

    getType(): string{
        return this.type;
    }

    getMinimumSemester(): number{
        return this.minimumSemester;
    }

    getMaximumSemester(): number{
        return this.maximumSemester;
    }

    getOffererDepartment(): string{
        return this.offererDepartment;
    }

    getRequesterDepartment(): string{
        return this.requesterDepartment;
    }

    toFirebaseObject(): JSON{
        var course: any = {
            code: this.getCode(),
            name: this.getName(),
            shortName: this.getShortName(),
            credits: this.getCredits(),
            hoursToSchedule: this.getHoursToSchedule(),
            type: this.getType(),
            minimumSemester: this.getMinimumSemester(),
            maximumSemester: this.getMaximumSemester(),
            offererDepartment: this.getOffererDepartment(),
            requesterDepartment: this.getRequesterDepartment()
        }

        return <JSON>course;
    }

}