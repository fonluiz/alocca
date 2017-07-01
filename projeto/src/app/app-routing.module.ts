import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { AddAllocationComponent } from './allocations/add-allocation/add-allocation.component';
import { EditAllocationComponent } from './allocations/edit-allocation/edit-allocation.component';
//courses
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ViewCoursesComponent } from './courses/view-courses/view-courses.component';
//professors
import { AddProfessorComponent } from './professors/add-professor/add-professor.component';
import { EditProfessorComponent } from './professors/edit-professor/edit-professor.component';
import { ViewProfessorsComponent } from './professors/view-professors/view-professors.component';
//home
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},

    {path: 'allocations', component: AddAllocationComponent},
    {path: 'edit-allocation/:id', component: EditAllocationComponent},

    {path: 'add-course', component: AddCourseComponent},
    {path: 'edit-course/:id', component: EditCourseComponent},
    {path: 'view-courses', component: ViewCoursesComponent},
    
    {path: 'add-professor', component: AddProfessorComponent},
    {path: 'edit-professor/:id', component: EditProfessorComponent},
    {path: 'view-professors', component: ViewProfessorsComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}