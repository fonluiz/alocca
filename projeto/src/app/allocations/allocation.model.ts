/**
 * @api {model} projeto/src/app/allocations/allocations.model.ts Allocation Model
 * @apiName Allocation Model
 * @apiGroup Allocation
 * @apiParam {string} professorOne First Professor of the course.
 * @apiParam {string} professorTwo Second Professor of the course.
 * @apiParam {string} course Course's name.
 * @apiParam {enum} courseType Course's type (Optional, complementary, mandatory or elective).
 * @apiParam {number} credits Course's credits.
 * @apiParam {string} note Additional info about this allocation.
 * @apiDescription Short Description.
 */
export class Allocation {
    constructor(
        caControl: boolean,
        classNumber: number,
        professorOneName: string,
        professorOneSIAP: string,
        professorTwoName: string,
        professorTwoSIAP: string,
        course: string,
        courseType: string,
        courseCredits: string,
        courseOffererDepartment: string,
        courseRequesterDepartment: string,
        note: String
        //alerts: Alerts[]
    ) {}

}
