/**
 * @api {component} projeto/src/app/allocations/alocation-table/alocation-table.component.ts Allocation Table Component
 * @apiName Allocation Table Component
 * @apiGroup Allocation
 */

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allocation-table',
  templateUrl: './allocation-table.component.html',
  styleUrls: ['./allocation-table.component.css']
})
export class AllocationTableComponent implements OnInit {
  allocationsList: any[];
  constructor(
    private FBservice: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.FBservice.getAllocations().subscribe( allocations =>{
      this.allocationsList = allocations;
    });
  }

  onDeleteAllocation(id){
    this.FBservice.deleteAllocation(id);
  }

}
