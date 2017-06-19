import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { AddAllocationComponent } from './allocations/add-allocation/add-allocation.component';
import { EditAllocationComponent } from './allocations/edit-allocation/edit-allocation.component';

const appRoutes: Routes = [
    {path: 'allocations', component: AddAllocationComponent},
    {path: 'editAllocation', component: EditAllocationComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}