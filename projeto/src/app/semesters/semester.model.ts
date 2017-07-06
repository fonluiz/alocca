/**
 * @api {model} projeto/src/app/semesters/semester.model.ts Semester Model
 * @apiName Semester Model
 * @apiGroup Semester
 * @apiParam {string} semester_id Semester's ID (ie. 2017.1, 2017.2).
 * @apiParam {Allocation[]} allocations List of allocations for that semester.
 */

import { Allocation } from '../allocations/allocation.model'

export class Semester {
    constructor(
        public semester_id: string,
        public allocations: Allocation[]
    ) { }

}