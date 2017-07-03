import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';

@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [ 
      AddCourseComponent,
      EditCourseComponent,
      ViewCoursesComponent
   ],
  exports:      [ CourseModule ]
})
export class CourseModule { }
