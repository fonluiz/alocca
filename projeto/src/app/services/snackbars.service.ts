import { Observable } from 'rxjs/Rx';
import { MdSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class SnackbarsService {
    snackMessage: string;
    constructor(private snackbar: MdSnackBar) { }
    
    openSnackBar(message,time) {
    this.snackMessage = message;
    var snackB = this.snackbar.open(this.snackMessage, null, { duration: time });
    // Eu coloquei o parâmetro action = null pra consertar um erro que estava dando.
    // É preciso consertar isso pq foi uma gambiarra provisória.
    // O jeito de consertar é receber uma action como parâmetro e passar essa action como argumento
  }
}