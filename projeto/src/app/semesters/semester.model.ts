/**
 * @api {model} projeto/src/app/semesters/semester.model.ts Semester Model
 * @apiName Semester Model
 * @apiGroup Semester
 * @apiParam {string} semester_id Semester's ID (ie. 2017.1, 2017.2).
 * @apiParam {Allocation[]} allocations List of allocations for that semester.
 */

export class Semester {
    constructor(
        private id: String,
        private allocations: String[]
    ) { }

    getId() {
        return this.id;
    }

    getAllocations() {
        return this.allocations;
    }

    setId(newId: String) {
        this.id = newId;
    }

    setAllocations(newAllocations: String[]) {
        this.allocations = newAllocations;
    }

    toFirebaseObject() {
        var firebaseObject: any = {
            'allocations': this.allocations
        };
        return <JSON>firebaseObject;
    }
}