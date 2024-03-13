import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BuyerListing } from '../../../_models/buyerListing';
import { BuyerListingService } from '../../../_services/buyerListing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buyer-listing-new',
  templateUrl: './buyer-listing-new.component.html',
  styleUrls: ['./buyer-listing-new.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    TextInputComponent,
    MatSelectModule,
    NgxSpinnerModule
  ]
})

export class BuyerListingNewComponent implements OnInit {
  myForm!: FormGroup;
  buyerListing: BuyerListing | undefined;

  constructor(private buyerListingService: BuyerListingService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.generateForm();
  }



  generateForm(){
    this.myForm = this.fb.group({
      buyerListingId :  [0],  
      userId :  [0],
      budget : [0, [Validators.required]],
      description : ['', [Validators.required]],
      createdDate : [new Date()],
      isDisabled : [false]
    });
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.spinner.show();
      this.buyerListing = this.myForm.value;

      this.buyerListingService.createBuyerListing(this.buyerListing!).subscribe({
          next: () => {  
            this.toastr.success("Successfully Saved!");  
            this.router.navigate(['/buyer-listing']);
            this.spinner.hide();
          }
      });
    }
  }

}
