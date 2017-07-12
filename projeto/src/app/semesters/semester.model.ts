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