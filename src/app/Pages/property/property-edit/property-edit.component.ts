import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PropertyNewComponent } from '../property-new/property-new.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    TextInputComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    PropertyNewComponent
  ]
})
export class PropertyEditComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: ActivatedRoute, 
  ) { }

  propertyId!: number;

  ngOnInit() {

  }

}
