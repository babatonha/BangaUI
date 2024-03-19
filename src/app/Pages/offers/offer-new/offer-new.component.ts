import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OfferService } from '../../../_services/offer.service';
import { Offer } from '../../../_models/offer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from '../../../_services/account.service';


@Component({
  selector: 'app-offer-new',
  templateUrl: './offer-new.component.html',
  styleUrls: ['./offer-new.component.scss'],
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
  ]
})
export class OfferNewComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Offer,
    private fb: FormBuilder,
   
    private toastr: ToastrService,
    public dialog: MatDialog,
    private accountService: AccountService,
    private spinner: NgxSpinnerService, 
    private offerService: OfferService,) { }

  ngOnInit() {
    this.generateForm();
  }

  generateForm(){
    this.myForm = this.fb.group({
      propertyOfferId : [this.data.propertyOfferId],
      propertyId : [0],
      offerByUserId : [0],
      buyerName : [''],
      description : [this.data.description, [Validators.required]],
      amount : [this.data.amount, [Validators.required]],
      createdDate : [new Date()],
      lastUpdatedDate : [new Date()],
      isAccepted : [false]
    });
  }

  
 onSubmit(){
  if(this.myForm.valid){
    let offer : Offer  = this.myForm.value;
    offer.propertyId = this.data.propertyId;
    offer.offerByUserId =  this.data.offerByUserId;


    this.spinner.show();
      this.offerService.createOffer(offer).subscribe({
        next: response => {
          this.toastr.success("Successfully Submitted");
          this.dialog.closeAll();
          this.spinner.hide();
        }
      })
  }
}
 

}




