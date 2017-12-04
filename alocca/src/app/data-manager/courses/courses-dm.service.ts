import { Injectable } from '@angular/core';
import { DataManagerService} from '../data-manager.service'
import { Observable } from 'rxjs/Observable';
import { Course } from '../../courses/course.model'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class CoursesDmService {

  dm: DataManagerService
  courses: AngularFireList<JSON>
  readonly coursesListName: string = 'courses'
  readonly coursesListReference: string = 'courses/'

  constructor(dm: DataManagerService) {
    this.dm = dm;
    this.courses = this.dm.createList(this.coursesListName);
  }

  addNewCourse(course: Course) {
    var self: CoursesDmService = this;

    this.dm.existReference(this.coursesListReference + course.getCode())
    .then((exists) => {
      if (exists) {
        throw new Error("This course key is already saved")
      } else {
        this.existShortName(course).then((exists) => {
          if (exists) {
            throw new Error("Can't save two courses with same shortName")
          } else {
            self.courses = self.dm.set(self.courses, course.toFirebaseObject(), course.getCode())            
          }
        })
      }
    })
  }

  existShortName(course: Course) {
   return this.courses.query.orderByChild('shortName').equalTo(course.getShortName()).once('value').then(
      function(snapshot) {
        return Promise.resolve(snapshot.exists())
      }
    )
  }


  
  

}
