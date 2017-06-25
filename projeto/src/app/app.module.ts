//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
///extra modules
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule} from 'angular2-flash-messages';
//firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from './services/firebase.service';
//components
import { AppComponent } from './app.component';
//our components
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




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FlashMessagesModule],
  declarations: [
    AppComponent,
    //extra declarations
    NavbarComponent,
    AddAllocationComponent,
    AllocationTableComponent,
    EditAllocationComponent,
    AddCourseComponent,
    AddProfessorComponent,
    EditProfessorComponent,
    ViewProfessorsComponent,
    EditCourseComponent,
    ViewCoursesComponent],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
