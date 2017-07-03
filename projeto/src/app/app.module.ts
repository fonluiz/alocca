//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
///extra modules
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule} from 'angular2-flash-messages';
///angular material
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';
//firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from './services/firebase.service';
//components
import { AppComponent } from './app.component';

import { NavbarModule } from './navbar/navbar.module';
import { CourseModule } from './courses/course.module'
import { ProfessorModule } from './professors/professor.module'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FlashMessagesModule,
    MaterialModule,
    BrowserAnimationsModule,
    CourseModule, 
    NavbarModule,
    ProfessorModule
  ],
  declarations: [
    AppComponent,
    ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
