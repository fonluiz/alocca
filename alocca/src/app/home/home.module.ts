import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeComponent } from './home.component';
import { MaterialModule } from './../material.module';

import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        AppRoutingModule
        ],
    declarations: [HomeComponent],
    exports: []
})

export class HomeModule {}