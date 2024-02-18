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
    MatIconModule
  ]
})
export class PropertyDetailComponent implements OnInit {
  propertyId: number = 0;
  propertyDetails: PropertyDetails | undefined;
  images: GalleryItem[] = [];

  constructor(  private route: ActivatedRoute, private propertyService: PropertyService,) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.propertyId = +params['id'];
      this.getPropertyDetails();

    });
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
}




