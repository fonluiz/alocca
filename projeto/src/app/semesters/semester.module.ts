/**
 * @api {module} projeto/src/app/semesters/semester.module.ts Semester Module
 * @apiName Semester Module
 * @apiGroup Semester
 * @apiParam {component} AddSemesterComponent
 */

import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from '../app-routing.module';

import { AddSemesterComponent } from './add-semester/add-semester.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        AppRoutingModule
    ],
    declarations: [
        AddSemesterComponent
    ],
    exports: []
})

export class SemesterModule {}