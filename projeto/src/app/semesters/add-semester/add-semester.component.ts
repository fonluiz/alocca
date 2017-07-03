import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-semester',
  templateUrl: './add-semester.component.html',
  styleUrls: ['./add-semester.component.css']
})
export class AddSemesterComponent implements OnInit {
    MAX_YEAR: number;
    years: number[];
    periods: number[];;

    constructor() {
        this.MAX_YEAR = 2030;
        // initialize years calling the function below. not working yet
        // for now, this initialization should be enough.
        this.years = [2017, 2018, 2019, 2020, 2021];
        this.periods = [1, 2];
    }

  /**
  initialize_years(){
      var i = 2017;
      do {
          this.years.push(i);
          i++;
      } while (i < this.MAX_YEAR);
  }
   *
   */
  ngOnInit() {
  }

}
