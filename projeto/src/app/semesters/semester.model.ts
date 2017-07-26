export class Semester {
    private id: string;
    private name: string;

    constructor(year: number, semester: number) {
        this.id = year + '-' + semester;
        this.name = year + '.' + semester;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setId(newId: string) {
        this.id = newId;
    }

    setName(newName: string) {
        this.name = newName;
    }

    toFirebaseObject() {
        var firebaseObject: any = {
            name: this.name
        }
        return <JSON>firebaseObject;
    }
}