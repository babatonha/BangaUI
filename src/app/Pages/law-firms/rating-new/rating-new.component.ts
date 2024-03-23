import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LawFirmRating } from '../../../_models/rating';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../_services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LawFirmService } from '../../../_services/lawFirm.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-rating-new',
  templateUrl: './rating-new.component.html',
  styleUrls: ['./rating-new.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    TextInputComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ]
})
export class RatingNewComponent implements OnInit {

  myForm!: FormGroup;
  ratingNumnbers: number[] = [1, 2, 3, 4, 5];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LawFirmRating,
    private fb: FormBuilder,
    private lawFirmService: LawFirmService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.generateForm();
  }

  
  generateForm(){
    this.myForm = this.fb.group({
      ratingId: [0],
      lawFirmId: [0],
      userId: [0],
      rating: [0,[Validators.required]],
      review: ['', [Validators.required]],
      userName: [''],
      userFullName: ['']
    });
  }


  onSubmit(){
    if(this.myForm.valid){
       let newRecord : LawFirmRating  = this.myForm.value;
        newRecord.lawFirmId = this.data.lawFirmId;
        newRecord.userId =  this.data.userId;
  
  
      this.spinner.show();
        this.lawFirmService.createLawFirmRating(newRecord).subscribe({
          next: () => {
            this.toastr.success("Successfully rated");
            this.dialog.closeAll();
            this.spinner.hide();
          }
        })
    }
  }

}
