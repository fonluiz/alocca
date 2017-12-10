//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
//Components
///Classes
import { EditClassComponent } from './classes/edit-class/edit-class.component';
import { ClassesContainerComponent } from './classes/classes-container/classes-container.component'
///Courses
import { CoursesContainerComponent } from './courses/courses-container/courses-container.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
///Professors
import { ProfessorsContainerComponent } from './professors/professors-container/professors-container.component';
import { EditProfessorComponent } from './professors/edit-professor/edit-professor.component';
///Restrictions
import { AddRestrictionComponent } from './professors/add-restriction/add-restriction.component';
///Home
import { HomeComponent } from './home/home.component';
///Navbar
import { NavbarComponent } from './navbar/navbar.component';
///Users
import { UsersContainerComponent } from "./users/users-container/users-container.component";
///Requests
import { ViewRequestsComponent } from './requests/view-requests/view-requests.component';
import { RequestAccessComponent } from './requests/request-access/request-access.component';
///Semesters
import { AddSemesterComponent } from './semesters/add-semester/add-semester.component';
///Schedules
import { SchedulesTableComponent } from './schedules/schedules-table/schedules-table.component';

/**
 * Routes for the system navigation.
 */
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'navbar', component: NavbarComponent},

    {path: 'classes', component: ClassesContainerComponent},
    {path: 'edit-class/:id', component: EditClassComponent},

    {path: 'courses', component: CoursesContainerComponent},
    {path: 'edit-course/:id', component: EditCourseComponent},
    
    {path: 'professors', component: ProfessorsContainerComponent},
    {path: 'add-restriction/:id', component: AddRestrictionComponent },
    {path: 'edit-professor/:id', component: EditProfessorComponent},

    {path: 'users', component: UsersContainerComponent},
    
    {path: 'request-access', component: RequestAccessComponent},
    {path: 'view-requests', component: ViewRequestsComponent},

    {path: 'add-semester', component: AddSemesterComponent },

    {path: 'schedules-table', component: SchedulesTableComponent}

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