import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BuyerListing } from '../../../_models/buyerListing';
import { BuyerListingService } from '../../../_services/buyerListing.service';

@Component({
  selector: 'app-buyer-listing',
  templateUrl: './buyer-listing.component.html',
  styleUrls: ['./buyer-listing.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    NgxSpinnerModule
  ]
})
export class BuyerListingComponent implements OnInit {

  datasource: BuyerListing[] = [];
  constructor(private buyerListService: BuyerListingService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.spinner.show(); 
    this.buyerListService.getAllBuyerListings().subscribe({
      next: response => {
        this.datasource = response;
        this.spinner.hide();
      }
    })
  }

}
