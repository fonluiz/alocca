import { Allocation } from '../allocations/allocation.model'

export class Semester {
    constructor(
        public semester_id: string,
        public allocations: Allocation[]
    ) { }

}