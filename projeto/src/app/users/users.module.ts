import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { FlashMessagesModule} from 'angular2-flash-messages';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';

import {AddUserComponent} from './add-user/add-user.component';
import {ViewUsersComponent} from './view-users/view-users.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        FlashMessagesModule,
        AppRoutingModule],
    declarations: [
        AddUserComponent,
        ViewUsersComponent],
    exports: []
})

export class UsersModule {}