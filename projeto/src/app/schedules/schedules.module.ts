import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
//change to snack bars
import { FlashMessagesModule} from 'angular2-flash-messages';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';
import { AlertsModule } from '../alerts/alerts.module'

import {SchedulesTableComponent} from './schedules-table/schedules-table.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlashMessagesModule,
        AlertsModule],
    declarations: [
        SchedulesTableComponent],
    exports: []
})

export class SchedulesModule {}
