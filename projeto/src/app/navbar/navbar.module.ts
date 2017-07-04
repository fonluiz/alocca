import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';

import {NavbarComponent} from './navbar.component';

@NgModule({
    imports: [
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CommonModule
    ],
    declarations: [NavbarComponent],
    exports: [NavbarComponent]
})

export class NavbarModule {}