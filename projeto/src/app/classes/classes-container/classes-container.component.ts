import { Component, OnInit } from '@angular/core';
import { Alert } from "app/alerts/alert.model";
import { AlertFactory } from "app/alerts/alert.factory";

@Component({
  selector: 'app-classes-container',
  templateUrl: './classes-container.component.html',
  styleUrls: ['./classes-container.component.css']
})
export class ClassesContainerComponent implements OnInit {

    alertTest: Alert;

  constructor() { }

  ngOnInit() {
      this.alertTest = new AlertFactory().create("Teste", "ABC");
      console.log(this.alertTest)
  }

}
