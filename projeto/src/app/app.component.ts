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
  selector: 'alocacao-form',
  templateUrl: `./alocacao-form.component.html`
})
export class AppAlocacao{
  //fazer mudanças quando integrar com o resto
  listaProfessores: any[] = [{
      "nome":"Eliane"
    },
    {
      "nome":"Gustavo"
    },
    {
      "nome":"Joseana"
    },
    {
      "nome":"Campelo"
    }];
  //fazer mudanças quando integrar com o resto
  listaDisciplinas: any[] = [{
      "nome":"Programação 1"
    },
    {
      "nome":"Introdução à Computação"
    },
    {
      "nome":"Gerência da Informação"
    },
    {
      "nome":"Laboratório de Engenharia de Software"
    }];

}


@Component({
  selector: 'alocacao-tabela',
  templateUrl: `./alocacao-tabela.component.html`
})
export class AppAlocacaoTabela{
  //fazer mudanças quando integrar com o resto
  listaAlocacoes: any[] = [{
    //mudar 'ca' para boolean
    "ca":"true",
    "disciplina": "Gerência da Informação",
    "docenteUm": "Campelo",
    "docenteDois":"",
    "tipo":"Obrigatória",
    "creditos": 4,
    "obs": "muito boa"
    },
    {
    //mudar 'ca' para boolean
    "ca":"false",
    "disciplina": "Introdução à Ciência da Computação",
    "docenteUm": "Joseana",
    "docenteDois":"",
    "tipo":"Obrigatória",
    "creditos": 4,
    "obs": "ótima"
    },
    {
    //mudar 'ca' para boolean
    "ca":"true",
    "disciplina": "Laboratório de Engenharia de Software",
    "docenteUm": "Gustavo",
    "docenteDois":"???",
    "tipo":"Obrigatória",
    "creditos": 2,
    "obs": "muito boa"
    }];
}