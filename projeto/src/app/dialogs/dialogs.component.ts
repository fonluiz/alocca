import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {

  public title: string;
  public message: string;

  constructor(
    public dialogRef: MdDialogRef<DialogsComponent>
  ) { }

  ngOnInit() {  }
}

