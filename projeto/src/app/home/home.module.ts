import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';

import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule],
    declarations: [HomeComponent],
    exports: []
})

export class HomeModule {}