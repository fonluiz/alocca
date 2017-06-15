import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppAlocacao } from './app.component';
import { AppAlocacaoTabela } from './app.component';

@NgModule({
  imports: [BrowserModule,FormsModule,HttpModule],
  declarations: [AppComponent, AppAlocacao, AppAlocacaoTabela],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
