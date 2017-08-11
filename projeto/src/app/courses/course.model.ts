export class Course {
    constructor(
        private name: string,
        private code: string,
        private credits: number,
        private hoursToSchedule: number,
        private type: string,
        private minimumSemester: number,
        private maximumSemester: number,
        private offererDepartment: string,
        private requesterDepartment: string
    ) {}

    getName(): string{
        return this.name;
    }

    getCode(): string{
        return this.code;
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

}