//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
///extra modules
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { CommonModule }  from '@angular/common';
///our modules
import { NavbarModule } from './navbar/navbar.module';
import { AllocationsModule } from './allocations/allocations.module';
import { CoursesModule } from './courses/courses.module';
import { ProfessorsModule } from './professors/professors.module';
import { SemesterModule } from './semesters/semester.module';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { HomeBodyModule } from './home-body/home-body.module';
import { RequestsModule } from './requests/requests.module';

///angular material
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';
import { MdDialogModule, MdButtonModule  } from '@angular/material';
import { DialogsService } from './services/dialogs.service';
//firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
//components
import { AppComponent } from './app.component';
///dialogs
import { DialogsComponent } from './dialogs/dialogs.component';





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
    AngularFireAuthModule,
    MdDialogModule,
    MdButtonModule,
    AllocationsModule,
    SemesterModule,
    CoursesModule,
    ProfessorsModule,
    NavbarModule,
    HomeModule,
    UsersModule,
    HomeBodyModule,
    RequestsModule
  ],
  declarations: [
    AppComponent,
    DialogsComponent
    ],
  entryComponents:[DialogsComponent],
  exports: [DialogsComponent],
  providers: [FirebaseService,DialogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
