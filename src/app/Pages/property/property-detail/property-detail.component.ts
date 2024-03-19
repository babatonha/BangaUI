import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../_services/property.service';
import { PropertyDetails } from '../../../_models/propertyDetails';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {  MatDialog} from '@angular/material/dialog';
import { OfferNewComponent } from '../../offers/offer-new/offer-new.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from '../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { OfferService } from '../../../_services/offer.service';
import { error } from 'console';
import { Offer } from '../../../_models/offer';
import { OfferListComponent } from '../../offers/offer-list/offer-list.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    GalleryModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    OfferListComponent
  ]
})
export class PropertyDetailComponent implements OnInit {
  propertyId: number = 0;
  propertyDetails: PropertyDetails | undefined;
  images: GalleryItem[] = [];

  currentUserId!:  number;
  propertyOffers: Offer[] = [] ;

  matTablePropertyOffers: any;

  constructor(  private route: ActivatedRoute, 
    private propertyService: PropertyService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private offerService: OfferService
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.propertyId = +params['id'];
      this.getPropertyDetails();
    });

    this.getCurrentUser();
    this.getPropertyOffers();
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      next: user => {
        if(user){
          this.currentUserId = user.id;
        }
      },
      error: error =>{}
    })
  }

  getPropertyDetails(){
    this.propertyService.getPropertyById(this.propertyId).subscribe({
      next: (response) => {
        this.propertyDetails = response;
        this.getPropertyImages();
      }
    })
  }


  getPropertyImages(){
    if(this.propertyDetails && this.propertyDetails.propertyPhotos){
      for (const photo of this.propertyDetails.propertyPhotos) {
       this.images.push(new ImageItem({src: photo.photoUrl, thumb: photo.photoUrl}));   
      }   
   }
  }

  getPropertyOffers(){
    this.spinner.show();
    this.offerService.getPropertyOffers(this.propertyId).subscribe({
      next: response => {
        this.propertyOffers = response;
        this.matTablePropertyOffers = new MatTableDataSource(response)
        this.spinner.hide();
      }
    })
  }

  openOfferDialog() { 
    const response: Offer  = this.propertyOffers.filter(x => x.propertyId === this.propertyId && x.offerByUserId === this.currentUserId)[0];

    this.dialog.open(OfferNewComponent, 
      {
        data: {
          propertyOfferId : response?  response.propertyOfferId : 0,
          offerByUserId: response?   this.currentUserId : 0, 
          propertyId: response?  this.propertyId : 0,   
          description :response?  response.description : "",
          amount : response? response.amount : 0,
        }
      });
  }
}




