//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
///extra modules
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { CommonModule }  from '@angular/common';
///angular material
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';
//firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
//components
import { AppComponent } from './app.component';
//our components
///home
import { HomeComponent } from './home/home.component';
///navbar
import { NavbarComponent } from './navbar/navbar.component';
///allocations
import { AddAllocationComponent } from './allocations/add-allocation/add-allocation.component';
import { AllocationTableComponent } from './allocations/allocation-table/allocation-table.component';
import { EditAllocationComponent } from './allocations/edit-allocation/edit-allocation.component';
///courses
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ViewCoursesComponent } from './courses/view-courses/view-courses.component';
///professors
import { AddProfessorComponent } from './professors/add-professor/add-professor.component';
import { EditProfessorComponent } from './professors/edit-professor/edit-professor.component';
import { ViewProfessorsComponent } from './professors/view-professors/view-professors.component';
///users
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ViewRequestsComponent } from './requests/view-requests/view-requests.component';
import { RequestAccessComponent } from './requests/request-access/request-access.component';
import { HomeBodyComponent } from './home-body/home-body.component';





@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FlashMessagesModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent,
    // extra declarations
    NavbarComponent,
    AddAllocationComponent,
    AllocationTableComponent,
    EditAllocationComponent,
    AddCourseComponent,
    AddProfessorComponent,
    EditProfessorComponent,
    ViewProfessorsComponent,
    EditCourseComponent,
    ViewCoursesComponent,
    HomeComponent,
    ViewUsersComponent,
    AddUserComponent,
    ViewRequestsComponent,
    RequestAccessComponent,
    HomeBodyComponent
    ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
