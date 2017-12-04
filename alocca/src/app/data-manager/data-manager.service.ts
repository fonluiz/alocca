import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataManagerService {

    db: AngularFireDatabase;

    constructor(db: AngularFireDatabase) {
      this.db = db;
     }

     // Documentar 
  createList<T>(object: T, listReference: string) { 
    return this.db.list<object>(listReference).valueChanges();
  }

  save(list: AngularFireList<JSON>, object: JSON) {
    return list.push(object);
  }

  set(list: AngularFireList<JSON>, object: JSON, objReference: string) {
    return list.set(objReference, object);
  }

  update(list: AngularFireList<JSON>, object: JSON, objReference: string) {
    return list.update(objReference, object);
  }

  delete(list: AngularFireList<JSON>, objReference: string) {
    return list.remove(objReference);
  }

  deleteList(list: AngularFireList<JSON>) {
    list.remove();
  }
}
