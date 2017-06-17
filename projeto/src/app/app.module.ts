import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppAllocationForm, AppAllocationTable } from './app.component';

@NgModule({
  imports: [BrowserModule,FormsModule,HttpModule],
  declarations: [AppComponent, AppAllocationForm, AppAllocationTable],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
