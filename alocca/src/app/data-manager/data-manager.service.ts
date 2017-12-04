import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataManagerService {

    db: AngularFireDatabase;

    constructor(db: AngularFireDatabase) {
      this.db = db;
     }

     // Documentar 
  createList<JSON>(listReference: string) { 
    return this.db.list<JSON>(listReference);
  }

  push<JSON>(list: AngularFireList<JSON>, object: JSON) {
      list.push(object);
      return list;
  }

  set(list: AngularFireList<JSON>, object: JSON, objReference: string) {
      list.set(objReference, object);
      return list;
  }

  update(list: AngularFireList<JSON>, object: JSON, objReference: string) {
      list.update(objReference, object)
      return list;
  }

  delete(list: AngularFireList<JSON>, objReference: string) {
      list.remove(objReference);
      return list;
  }

  deleteList(list: AngularFireList<JSON>) {
    list.remove();
    return list;
  }

  readObject(listReference: string, id: string): AngularFireObject<any> {
      var object = this.db.object(listReference + id) as AngularFireObject<any>;
      return object;
  }
}
