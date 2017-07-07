import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseService } from '../../services/firebase.service';
import { Request } from '../request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css']
})
export class RequestAccessComponent implements OnInit {
  email: string;
  name: string;
  SAVED_SUCCESSFULLY_MESSAGE: string = "Sua solicitação foi enviada!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que você já enviou uma solicitação. Paciência.";
  TIMEOUT_SAVED_MESSAGE = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }


  onAddNewRequest(){
    let request = {
      email: this.email,
      name: this.name
    }

    let savedSuccessfully: boolean = this.FBservice.addNewRequest(request);
    console.log(savedSuccessfully);
    
    this.email = null;
    this.name = null;

    if(savedSuccessfully===true){
        this._flashMessagesService.show(this.SAVED_SUCCESSFULLY_MESSAGE, { cssClass: 'alert-success', timeout: this.TIMEOUT_SAVED_MESSAGE });
    }
    else{
      console.log(savedSuccessfully);
        this._flashMessagesService.show(this.NOT_SAVED_MESSAGE, { cssClass: 'alert-danger', timeout: this.TIMEOUT_SAVED_MESSAGE });
        
    }  
  }

  ngOnInit() {
  }

}
