import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { AddProfessorComponent } from './add-professor/add-professor.component';
import { EditProfessorComponent } from './edit-professor/edit-professor.component';
import { ViewProfessorsComponent } from './view-professors/view-professors.component';

@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [ 
      AddProfessorComponent,
      EditProfessorComponent,
      ViewProfessorsComponent
   ],
  exports:      [ ProfessorModule ]
})
export class ProfessorModule { }
