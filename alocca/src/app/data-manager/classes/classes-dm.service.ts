import { Injectable } from '@angular/core';
import { DataManagerService} from '../data-manager.service'
import { Class } from '../../classes/class.model'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class ClassesDmService {

  dm: DataManagerService
  classes: AngularFireList<JSON>
  readonly classesListName: string = 'classes'
  readonly classesListReference: string = 'classes/'

  constructor(dm: DataManagerService) { 
    this.dm = dm;
    this.classes = this.dm.createList(this.classesListName);
  }

  addNewClass(semester: string, classObj: Class) {
    var self: ClassesDmService = this;
    var classReference = semester + '/' + classObj.getId();
    
    this.dm.existReference(this.classesListReference + classReference)
    .then((exists) => {
      if (exists) {
        throw new Error("This class key is already saved")
      } else {
          self.classes = self.dm.set(self.classes, classObj.toFirebaseObject(), classReference)            
      }
    })
  }

  updateClass(semester: string, classObj: Class) {
    return this.dm.update(this.classes, classObj.toFirebaseObject(), classObj.getId()).then(
      (list) => { this.classes = list; return true; }
    ).catch((error) => {
      return false;
    });
  }

}
