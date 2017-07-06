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
        //???
        //caControl: boolean,
        prfessorOne: string,
        professorTwo: string,
        course: string,
        courseType: number,
        credits: string,
        obs: String
    ) {}

}