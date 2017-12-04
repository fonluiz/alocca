import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { ProfessorRestriction } from '../../professors/professor-restriction.model';

@Injectable()
export class ProfessorsRestrictionsDmService {
    readonly PROFESSORS_RESTRICTION_PATH = "professorRestrictions";

    dm: DataManagerService;
    professorsRestrictions: AngularFireList<JSON>;

    constructor(dm: DataManagerService) {
        this.dm = dm;
        this.professorsRestrictions = dm.createList(this.PROFESSORS_RESTRICTION_PATH);
    }

    saveProfessorRestriction(restriction: ProfessorRestriction) {
        this.dm.set(this.professorsRestrictions, restriction.toFirebaseObject(), restriction.getSIAPESemester());
    }

    getProfessorRestrictionsList() {
        return this.professorsRestrictions;
    }

    getProfessorRestrictions(restrictionId: string) {
        return this.dm.readObject(this.PROFESSORS_RESTRICTION_PATH + restrictionId);
    }
}