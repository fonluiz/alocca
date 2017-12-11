import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { Professor } from '../../professors/professor.model';

@Injectable()
export class ProfessorsDmService {
    readonly professorsListName = "professors";
    readonly professorsListReference = "/professors/";

    dm: DataManagerService;
    professors: AngularFireList<JSON>;

    constructor(dm: DataManagerService) {
        this.dm = dm;
        this.professors = dm.createList(this.professorsListName);
    }

    addNewProfessor(professor: Professor) {

        var self: ProfessorsDmService = this;

        this.dm.existReference(this.professorsListReference + professor.getSIAPE())
            .then((exists) => {
                if (exists) {
                    throw new Error("This professor key is already saved.");
                } else {
                    this.existsNickname(professor).then((exists) => {
                        if (exists) {
                            throw new Error("Can't save two professors with same nickname.");
                        } else {
                            self.professors = self.dm.set(self.professors, professor.toFirebaseObject(), professor.getSIAPE());
                        }
                    })
                }
            });
    }

    getProfessors() {
        return this.professors;
    }

    getProfessorDetails(id: string) {
        return this.dm.readObject(this.professorsListReference + id);
    }

    updateProfessor(professor: Professor) {
        return this.dm.update(this.professors, professor.toFirebaseObject(), professor.getSIAPE()).then(
            (list) => { this.professors = list; return true; }
        ).catch((error) => {
            return false;
        });
    }

    deleteProfessor(professorId: string) {
        return this.dm.delete(this.professors, professorId).then(
            (list) => { this.professors = list; return true }
        ).catch((error) => {
            return false;
        });
    }

    private existsNickname(professor: Professor) {
        return this.professors.query.orderByChild('nickname').equalTo(professor.getNickname()).once('value').then(
            function (snapshot) {
                return Promise.resolve(snapshot.exists())
            }
        )
    }
}