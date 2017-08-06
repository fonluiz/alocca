import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Request } from '../request.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

const SAVED_SUCCESSFULLY_MESSAGE: string = "Sua solicitação foi enviada!";
const NOT_SAVED_MESSAGE: string = "Opa! Parece que você já enviou uma solicitação. Paciência.";
const TIMEOUT_SAVED_MESSAGE = 2500;
const TIMEOUT_NOT_SAVED_MESSAGE = 5000;

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css']
})
export class RequestAccessComponent implements OnInit {
  // should be private, but if so, maybe it won't work correctly.
  email: string;
  name: string;
  SIAPE: string;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private snackService: SnackbarService
  ) { }

  onAddNewRequest(){
    let request = {
      SIAPE: this.SIAPE,
      email: this.email,
      name: this.name
    }

    let savedSuccessfully: boolean = this.FBservice.addNewRequest(request);
    console.log(savedSuccessfully);
    
    this.SIAPE = null;
    this.email = null;
    this.name = null;

    if(savedSuccessfully===true){
      console.log(true);
        this.snackService.openSnackBar(SAVED_SUCCESSFULLY_MESSAGE, TIMEOUT_SAVED_MESSAGE);
        this.router.navigate(['/home']);
    }
    else{
      console.log(savedSuccessfully);
        this.snackService.openSnackBar(NOT_SAVED_MESSAGE, TIMEOUT_NOT_SAVED_MESSAGE);
        
    }
  }

  ngOnInit() {
    let initiateRequests: any[];
    this.FBservice.getRequestsEmails().subscribe(requests =>{
      initiateRequests = requests;
    });
  }

}
