import { Component, OnInit } from '@angular/core';
 
import {MdCheckbox} from '@angular/material';
@Component({
  selector: 'app-add-restriction',
  templateUrl: './add-restriction.component.html',
  styleUrls: ['./add-restriction.component.css']
})

export class AddRestrictionComponent implements OnInit {
  
  hours = ["7:00 - 8:00", "8:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00",
          "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00", "20:00 - 22:00"];

  constructor() { }

  ngOnInit() {
  }

  private testTable() {
    for (var i = 1; i <= 40; i++) {
      var x = <MdCheckbox><any>document.getElementById("input-md-checkbox-"+i);
    }
    console.log(x.checked);
  }

}
