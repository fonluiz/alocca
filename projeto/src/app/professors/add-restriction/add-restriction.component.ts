/**
 * @api {component} projeto/src/app/professors/add-restriction/add-restriction.component.ts Add Restriction Component
 * @apiName Add Restriction Component
 * @apiGroup Professor
 */

import { Component, OnInit } from '@angular/core';

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

}
