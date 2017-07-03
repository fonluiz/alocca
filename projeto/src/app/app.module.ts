//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
///extra modules
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule} from 'angular2-flash-messages';
///our modules
import {AllocationsModule} from './allocations/allocations.module';
import {CoursesModule} from './courses/courses.module';
import {ProfessorsModule} from './professors/professors.module';
import { NavbarModule } from './navbar/navbar.module';
//firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from './services/firebase.service';
//components
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FlashMessagesModule,
    AllocationsModule,
    CoursesModule,
    ProfessorsModule,
    NavbarModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
