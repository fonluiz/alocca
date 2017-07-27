import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { SnackbarsService } from '../../services/snackbars.service';
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
  SIAPE: string;
  SAVED_SUCCESSFULLY_MESSAGE: string = "Sua solicitação foi enviada!";
  NOT_SAVED_MESSAGE: string = "Opa! Parece que você já enviou uma solicitação. Paciência.";
  TIMEOUT_SAVED_MESSAGE = 2500;
  TIMEOUT_NOT_SAVED_MESSAGE = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private snackService: SnackbarsService
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
        this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_SAVED_MESSAGE);
        this.router.navigate(['/home']);
    }
    else{
      console.log(savedSuccessfully);
        this.snackService.openSnackBar(this.NOT_SAVED_MESSAGE,this.TIMEOUT_NOT_SAVED_MESSAGE);
        
    }
  }

  ngOnInit() {
    let initiateRequests: any[];
    this.FBservice.getRequestsEmails().subscribe(requests =>{
      initiateRequests = requests;
    });
  }

}
