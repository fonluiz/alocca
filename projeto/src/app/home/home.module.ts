import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
//it may need a lot less imports //check it out later
import { FlashMessagesModule} from 'angular2-flash-messages';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';

import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        FlashMessagesModule,
        AppRoutingModule],
    declarations: [HomeComponent],
    exports: []
})

export class HomeModule {}