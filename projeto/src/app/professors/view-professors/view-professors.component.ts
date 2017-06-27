import { Component, OnInit } from '@angular/core';
import { Professor } from '../professor.model';
import { PROFESSORES } from '../professor.mock';

@Component({
  selector: 'app-view-professors',
  templateUrl: './view-professors.component.html',
  styleUrls: ['./view-professors.component.css']
})
export class ViewProfessorsComponent implements OnInit {
    professores: Professor[] = PROFESSORES;

  constructor() { }

  ngOnInit() {
  }

}
