import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { ProfessorRestriction } from '../../professors/professor-restriction.model';

@Injectable()
export class ProfessorsRestrictionsDmService {

    dm: DataManagerService;
    professorsRestrictions: AngularFireList<JSON>;
    readonly professorsRestrictionListName = "professorRestrictions";
    readonly professorsRestrictionListReference: string = 'professorRestrictions/'

    constructor(dm: DataManagerService) {
        this.dm = dm;
        this.professorsRestrictions = dm.createList(this.professorsRestrictionListName);
    }

    saveProfessorRestriction(restriction: ProfessorRestriction) {
        this.dm.set(this.professorsRestrictions, restriction.toFirebaseObject(), restriction.getSIAPESemester());
    }

    getProfessorRestrictionsList() {
        return this.professorsRestrictions;
    }

    getProfessorRestrictions(restrictionId: string) {
        return this.dm.readObject(this.professorsRestrictionListName + restrictionId);
    }
}