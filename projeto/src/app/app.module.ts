//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

///Extra modules
import { AppRoutingModule } from './app-routing.module';

///Our modules
import { NavbarModule } from './navbar/navbar.module';
import { ClassesModule } from './classes/classes.module';
import { CoursesModule } from './courses/courses.module';
import { ProfessorsModule } from './professors/professors.module';
import { SemesterModule } from './semesters/semester.module';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module';
import { SchedulesModule } from './schedules/schedules.module';

//Angular material
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';
import { MdDialogModule, MdButtonModule  } from '@angular/material';
import { DialogsService } from './services/dialogs.service';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Components
import { AppComponent } from './app.component';
import { DialogsComponent } from './dialogs/dialogs.component';

//Services
import { NavbarService } from './services/navbar.service';
import { SnackbarService} from './services/snackbar.service';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    MdDialogModule,
    MdButtonModule,
    ClassesModule,
    SemesterModule,
    CoursesModule,
    ProfessorsModule,
    NavbarModule,
    HomeModule,
    UsersModule,
    RequestsModule,
    SchedulesModule
  ],
  declarations: [
    AppComponent,
    DialogsComponent],
  entryComponents:[DialogsComponent],
  exports: [DialogsComponent],
  providers: [FirebaseService, DialogsService, NavbarService, SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
