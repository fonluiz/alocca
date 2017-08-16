import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { FlashMessagesModule} from 'angular2-flash-messages';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';

import { ClassesContainerComponent } from './classes-container/classes-container.component';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassTableComponent } from './class-table/class-table.component';
import { EditClassComponent } from './edit-class/edit-class.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlashMessagesModule],
    declarations: [
        ClassesContainerComponent,
        AddClassComponent,
        EditClassComponent,
        ClassTableComponent],
    exports: []
})

export class ClassesModule {}