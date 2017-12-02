import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '.././material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';

import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { CoursesContainerComponent } from './courses-container/courses-container.component';

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
        ViewCoursesComponent,
        CoursesContainerComponent],
    exports: []
})

export class CoursesModule {}