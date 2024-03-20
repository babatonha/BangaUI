import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfirmDialogComponent implements OnInit {
  title: string = "Confirm";
  content: string = ""; 
  onConfirm: EventEmitter<any> = new EventEmitter();

  constructor( @Inject(MAT_DIALOG_DATA) public data: ConfirmModel,
  public dialogRef: MatDialogRef<ConfirmDialogComponent>,) { 
    this.title = data.title;
    this.content = data.content;
  }

  ngOnInit() {
  }

  confirmClick(){
    this.onConfirm.emit();
  }

}


export interface ConfirmModel{
  title: string;
  content: string;
}