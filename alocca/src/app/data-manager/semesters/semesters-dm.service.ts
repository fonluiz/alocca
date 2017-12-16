import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { Semester } from "../../semesters/semester.model";

@Injectable()
export class SemestersDmService {

    dm: DataManagerService;
    semesters: AngularFireList<JSON>;
    readonly semestersListName = "semesters";
    readonly semestersListReference: string = 'semesters/';

    constructor(dm: DataManagerService) {
        this.dm = dm;
        this.semesters = dm.createList(this.semestersListName);
    }

    saveSemester(semester: Semester) {
        this.dm.set(this.semesters, semester.toFirebaseObject(), semester.getId());
    }

    getSemesters() {
        return this.semesters.valueChanges();
    }

    getSemester(semesterId: string) {
        return this.dm.readObject(this.semestersListReference + semesterId);
    }

    removeSemester(reference: string) {
        return this.dm.delete(this.semesters, reference).then(
            (list) => { this.semesters = list; return true }
        ).catch((error) => {
            return false;
        });
    }
}