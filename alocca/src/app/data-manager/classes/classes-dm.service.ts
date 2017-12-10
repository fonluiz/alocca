import { Injectable } from '@angular/core';
import { DataManagerService} from '../data-manager.service'
import { Class } from '../../classes/class.model'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class ClassesDmService {

  readonly classesListName: string = 'classes'
  readonly classesListReference: string = 'classes/'
  dm: DataManagerService
  classes: AngularFireList<JSON>
  semester: string

  constructor(dm: DataManagerService) { 
    this.dm = dm;
    this.classes = this.dm.createList(this.classesListName);
  }

  addNewClass(classObj: Class) {
    if (this.semester != null) {
      var self: ClassesDmService = this;
      var classReference = this.semester + '/' + classObj.getId();
      
      this.dm.existReference(this.classesListReference + classReference)
      .then((exists) => {
        if (exists) {
          throw new Error("This class key is already saved")
        } else {
            self.classes = self.dm.set(self.classes, classObj.toFirebaseObject(), classReference)            
        }
      })
    } else {
      throw new Error("Semester not defined. Use setSemester() method.")
    }
  }

  updateClass(classObj: Class) {
    if (this.semester != null) {
      var classReference = this.semester + '/' + classObj.getId();
      return this.dm.update(this.classes, classObj.toFirebaseObject(), classReference).then(
        (list) => { this.classes = list; return true; }
      ).catch((error) => {
        return false;
      });
    } else {
      throw new Error("Semester not defined. Use setSemester() method.")
    }
  }

  deleteClass(reference: string) {
    var classReference = this.semester + '/' + reference;
    return this.dm.delete(this.classes, classReference).then(
      (list) => { this.classes = list; return true }
    ).catch((error) => {
      return false;
    });
  }

  getClasses() {
    // if (this.semester != null) {
      return this.dm.createList(this.classesListReference + this.semester).valueChanges();
    // } else {
    //   throw new Error("Semester not defined. Use setSemester() method.")      
    // }
  }

  getClass(semester: string, classReference: string) {
    var classReference = semester + '/' + classReference;
    return this.dm.readObject(this.classesListReference + classReference).valueChanges();
  }

  setSemester(newSemester: string) {
    this.semester = newSemester
  }

  getSemester() {
    return this.semester
  }
}
