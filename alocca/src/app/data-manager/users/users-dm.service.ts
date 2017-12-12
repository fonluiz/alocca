import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { User } from '../../users/user.model';

@Injectable()
export class UsersDmService {
    readonly usersListName = "users";
    readonly usersListReference = "/users/";

    dm: DataManagerService;
    users: AngularFireList<JSON>;

    constructor(dm: DataManagerService) {
        this.dm = dm;
        this.users = dm.createList(this.usersListName);
    }

    addNewUser(user: User) {

        var self: UsersDmService = this;

        this.dm.existReference(this.usersListReference + user.getSIAPE())
            .then((exists) => {
                if (exists) {
                    throw new Error("This user key is already saved.");
                } else {
                    this.existsEmail(user).then((exists) => {
                        if (exists) {
                            throw new Error("Can't save two users with same email.");
                        } else {
                            self.users = self.dm.set(self.users, user.toFirebaseObject(), user.getSIAPE());
                        }
                    })
                }
            });
    }

    getUsers() {
        return this.users;
    }

    getUsersEmails() {
        // return this.usersEmails;
    }

    getUserDetails(id: string) {
        return this.dm.readObject(this.usersListReference + id);
    }

    updateProfessor(user: User) {
        return this.dm.update(this.users, user.toFirebaseObject(), user.getSIAPE()).then(
            (list) => { this.users = list; return true; }
        ).catch((error) => {
            return false;
        });
    }

    deleteUser(userId: string) {
        return this.dm.delete(this.users, userId).then(
            (list) => { this.users = list; return true }
        ).catch((error) => {
            return false;
        });
    }

    private existsEmail(user: User) {
        return this.users.query.orderByChild('email').equalTo(user.getEmail()).once('value').then(
            function (snapshot) {
                return Promise.resolve(snapshot.exists())
            }
        )
    }
}