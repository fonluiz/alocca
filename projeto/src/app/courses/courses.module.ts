/**
 * @api {module} projeto/src/app/courses/courses.module.ts Courses Module
 * @apiName Course Module
 * @apiGroup Course
 * @apiParam {component} AddCourseComponent
 * @apiParam {component} EditCourseComponent
 * @apiParam {component} ViewCoursesComponent
 */

import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { FlashMessagesModule} from 'angular2-flash-messages';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';

import {AddCourseComponent} from './add-course/add-course.component';
import {EditCourseComponent} from './edit-course/edit-course.component';
import {ViewCoursesComponent} from './view-courses/view-courses.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule],
    declarations: [
        AddCourseComponent,
        EditCourseComponent,
        ViewCoursesComponent],
    exports: []
})

export class CoursesModule {}