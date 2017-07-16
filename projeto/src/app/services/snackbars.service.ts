import { Observable } from 'rxjs/Rx';
import { MdSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class SnackbarsService {
    snackMessage: string;
    constructor(private snackbar: MdSnackBar) { }
    
    openSnackBar(message,time) {
    this.snackMessage = message;
    var snackB = this.snackbar.open(this.snackMessage);
    snackB._dismissAfter(time);
  }
}