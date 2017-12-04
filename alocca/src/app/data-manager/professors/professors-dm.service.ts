import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { Professor } from '../../professors/professor.model';

@Injectable()
export class ProfessorsDmService {
    readonly professorsListName = "professors";
    readonly professorsListRef = "professors/";

    dm: DataManagerService;
    professors: AngularFireList<JSON>;

    constructor(dm: DataManagerService) {
        this.dm = dm;
        this.professors = dm.createList(this.professorsListName);
    }

    addNewProfessor(professor: Professor) {
        try {
            this.verifyConstraints(professor);
            this.professors = this.dm.set(this.professors, professor.toFirebaseObject(), professor.getSIAPE());
            return true;
        } catch (e) {
            console.log("Constraint violation on Professors: " + e);
        }
    }

    getProfessors() {
        return this.professors;
    }

    getProfessorDetails(id: string) {
        return this.dm.readObject(this.professorsListRef + id);
    }

    updateProfessor(professorId: string, professor: Professor) {
        this.dm.update(this.professors, professor.toFirebaseObject(), professorId);
    }

    deleteProfessor(professorId: string) {
        this.dm.delete(this.professors, professorId);
    }

    private verifyConstraints(professor: Professor) {
            
    }
}