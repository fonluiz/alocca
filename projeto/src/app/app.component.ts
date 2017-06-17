import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '<Menu de Opções>';
}


@Component({
  selector: 'allocation-form',
  templateUrl: `./allocation/templates/allocation-form.component.html`
})
export class AppAllocationForm{
  //make changes when integrating with other application parts
  professorsList: any[] = [{
      "name":"Eliane"
    },
    {
      "name":"Gustavo"
    },
    {
      "name":"Joseana"
    },
    {
      "name":"Campelo"
    }];
  //make changes when integrating with other application parts
  coursesList: any[] = [{
      "name":"Programação 1"
    },
    {
      "name":"Introdução à Computação"
    },
    {
      "name":"Gerência da Informação"
    },
    {
      "name":"Laboratório de Engenharia de Software"
    }];

}


@Component({
  selector: 'allocation-table',
  templateUrl: `./allocation/templates/allocation-table.component.html`
})
export class AppAllocationTable{
  //make changes when integrating with other application parts
  allocationsList: any[] = [{
    "ca":"true",
    "course": "Gerência da Informação",
    "professorOne": "Campelo",
    "profesorTwo":"",
    "type":"Obrigatória",
    "credits": 4,
    "obs": "muito boa"
    },
    {
    "ca":"false",
    "course": "Introdução à Ciência da Computação",
    "professorOne": "Joseana",
    "professorTwo":"",
    "type":"Obrigatória",
    "credits": 4,
    "obs": "ótima"
    },
    {
    "ca":"true",
    "course": "Laboratório de Engenharia de Software",
    "professorOne": "Gustavo",
    "professorTwo":"????",
    "type":"Obrigatória",
    "credits": 2,
    "obs": "muito boa"
    }];
}