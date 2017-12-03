import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { MaterialModule } from '.././material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';

import { AddUserComponent } from './add-user/add-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { UsersContainerComponent } from './users-container/users-container.component';

import { ViewRequestsComponent } from "./../requests/view-requests/view-requests.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule],
    declarations: [
        AddUserComponent,
        ViewUsersComponent,
        ViewRequestsComponent,
        UsersContainerComponent],
    exports: []
})

export class UsersModule {}