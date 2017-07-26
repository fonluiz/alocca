export class Semester {
    private classes: String[];
    private professorRestrictions: String[];
    private alerts: String[];

    constructor(private id: String) {
        this.classes = [];
        this.professorRestrictions = [];
        this.alerts = [];
    }

    getId() {
        return this.id;
    }

    getClasses() {
        return this.classes;
    }

    setId(newId: String) {
        this.id = newId;
    }

    setClasses(newClasses: String[]) {
        this.classes = newClasses;
    }

    toFirebaseObject() {
        var firebaseObject: any;
        if (this.classes.length > 0 || this.professorRestrictions.length > 0 || this.alerts.length > 0) {
            firebaseObject = {
                'classes': this.classes,
                'professorRestrictions': this.professorRestrictions,
                'alerts': this.alerts
             };
        } else {
            firebaseObject = {
                'noDataYet': true
            }
        }
        return <JSON>firebaseObject;
    }
}