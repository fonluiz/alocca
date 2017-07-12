import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { FlashMessagesModule} from 'angular2-flash-messages';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';

import {RequestAccessComponent} from './request-access/request-access.component';
import { ViewRequestsComponent } from './view-requests/view-requests.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlashMessagesModule],
    declarations: [
        RequestAccessComponent,
        ViewRequestsComponent],
    exports: []
})

export class RequestsModule {}