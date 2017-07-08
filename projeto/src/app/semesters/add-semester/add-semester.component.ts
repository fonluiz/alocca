/**
 * @api {component} projeto/src/app/semesters/add-semester/add-semester.component.ts Add Semester Component
 * @apiName Add Semester Component
 * @apiGroup Semester
 */

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-add-semester',
  templateUrl: './add-semester.component.html',
  styleUrls: ['./add-semester.component.css']
})
export class AddSemesterComponent implements OnInit {
    MAX_YEAR: number;
    years: number[];
    semesters: number[];
    year: number;
    semester: number;

    constructor(
        private FBservice: FirebaseService
    ) {
        this.MAX_YEAR = 2030;
        this.years = [];
        // initialize years calling the function below. not working yet
        // for now, this initialization should be enough.
        this.initialize_years();
        //this.years = [2017, 2018, 2019, 2020, 2021];
        this.semesters = [1, 2];
    }

  private initialize_years = () => {
      var i = 2017;
      do {
          this.years.push(i);
          i++;
      } while (i <= this.MAX_YEAR);
    }

  onAddNewSemester() {

      let semester_id_str = this.year + "." + this.semester
      let semester_key_str = this.year +"_"+ this.semester

      let newSemester = {
          semester_id: semester_id_str,
          semesterKey: semester_key_str
      }

      this.FBservice.addNewSemester(newSemester);
      console.log(semester_id_str)
      console.log(semester_key_str)
  }

  ngOnInit() {
  }

}
