import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../../../_models/property';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { City } from '../../../_models/city';
import { PropertyType } from '../../../_models/propertyType';
import { LawFirm } from '../../../_models/lawFirm';
import { PropertyService } from '../../../_services/property.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from '../../../shared/photo-editor/photo-editor.component';
import {MatStepperModule} from '@angular/material/stepper';
import { PropertyPhoto } from '../../../_models/propertyPhoto';
import { PropertyPhotoService } from '../../../_services/propertyPhoto.service';
import { PropertyDetails } from '../../../_models/propertyDetails';

@Component({
  selector: 'app-property-new',
  templateUrl: './property-new.component.html',
  styleUrls: ['./property-new.component.scss'],
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
    NgxSpinnerModule,
    PhotoEditorComponent,
    MatStepperModule
  ]
})
export class PropertyNewComponent implements OnInit {
  newRecord!: Property;
  myForm!: FormGroup;
  cities: City[] = [];
  propertyTypes: PropertyType[] = [];
  lawFirms: LawFirm[] = [];
  propertyPhotos: PropertyPhoto[] = [];
  propertyId: number = 0;
 currentPropertyId!: number;

  suburbs: any[] = [];

  selectedAmenities: string[] = [];

  amenitiesList: string[] = ['Good zesa', 'Municipal water', 'Veranda', 
  'Walled', 'Pool', 'Gym', 'Garage', 'Fenced', 'Fireplace', 'Garden'];

  isLinear: boolean = true;

  constructor(private fb: FormBuilder,
    private propertyService: PropertyService,
    private propertyPhotoService: PropertyPhotoService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute, 
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.generatePropertyForm();
    this.loadPageData();
  }

  loadPageData(){

    this.propertyService.getPropertyLookupData().subscribe({
      next: (response) => {
          this.cities = response.cities;
          this.suburbs = response.suburbs;
          this.lawFirms = response.lawFirms;  
          this.propertyTypes = response.propertyTypes;

          this.route.params.subscribe((params: any) => {
            this.currentPropertyId = +params['id'];
            if(this.currentPropertyId > 0){
              this.getCurrentPropertyData();
              this.getPropertyPhotos(this.currentPropertyId);
            }else{
              this.getPropertyPhotos(this.propertyId);
            }
            
          });

          
      }
    });
 
  }


  getCurrentPropertyData(){
    this.propertyService.getPropertyById(this.currentPropertyId).subscribe({
      next: (response: PropertyDetails) => {
        if(response){

          //this.selectedAmenities = response.property.amenities? response.property.amenities.split(','): [];
          this.myForm = this.fb.group({
            propertyId : [response.property.propertyId],
            ownerId :  [response.property.ownerId],
            assignedLawyerId :  [response.property.assignedLawyerId],
            statusID :  [response.property.statusID],
            propertyTypeId :  [response.property.propertyTypeId, [Validators.required]],
            suburbId :  [response.property.suburbId],
            cityId :  [ response.property.cityId, [Validators.required]],
            provinceId :  [response.property.provinceId, [Validators.required]],
            address :  [response.property.address, [Validators.required]],
            price :  [response.property.price, [Validators.required]],
            description : [response.property.description, [Validators.required]],
            numberOfRooms : [response.property.numberOfRooms, [Validators.required]],
            numberOfBathrooms :  [response.property.numberOfBathrooms, [Validators.required]],
            parkingSpots :  [response.property.parkingSpots, [Validators.required]],
            thumbnailUrl: [response.property.thumbnailUrl],
            youtubeUrl : [response.property.youtubeUrl],
            hasLawyer :  [response.property.hasLawyer],
            numberOfLikes :  [response.property.numberOfLikes],
            amenities: [response.property.amenities],
            isSold: [response.property.isSold],
            isDeleted: [response.property.isDeleted],
            isActive: [response.property.isActive],
          });
        }
      }
    });
  }

  generatePropertyForm(){
    this.myForm = this.fb.group({
      propertyId : [0],
      ownerId :  [0],
      ownerName :  [''],
      assignedLawyerId :  [''],
      statusID :  [0],
      statusName :  [''],
      assignedLawyerName :  [''],
      propertyTypeId :  ['', [Validators.required]],
      propertyTypeName :  [''],
      suburbId :  [0],
      cityId :  [0, [Validators.required]],
      cityName :  [''],
      provinceId :  [0],
      provinceName :  [''],
      address :  ['', [Validators.required]],
      price :  ['', [Validators.required]],
      description : ['', [Validators.required]],
      numberOfRooms : ['', [Validators.required]],
      numberOfBathrooms :  ['', [Validators.required]],
      parkingSpots :  ['', [Validators.required]],
      thumbnailUrl: [''],
      youtubeUrl : [''],
      hasLawyer :  [false],
      numberOfLikes :  [0],
      amenities: [''],

    });
  }

  onSelectionChange(event: any) {
    this.selectedAmenities =  event.value;
  }

  getPropertyPhotos(propertyId: number){
    this.propertyPhotoService.getPropertyPhotos(propertyId).subscribe({
      next: response =>{
        this.propertyPhotos = response;
      }
    })
  }

  deletePhoto(photoId: number){
    this.spinner.show();
    this.propertyPhotoService.deletePhoto(photoId).subscribe({
      next: response =>{
        this.toastr.success("Successfully Deleted!");
        this.getPropertyPhotos(this.currentPropertyId); 
        this.spinner.hide();
      }
    })
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.spinner.show();
      this.newRecord = this.myForm.value;
      this.newRecord.amenities = this.selectedAmenities.toString();

      this.propertyService.createProperty(this.newRecord).subscribe({
          next: () => {  
            this.toastr.success("Successfully Saved!");  
            if(this.currentPropertyId > 0){
              //this.router.navigate(['/property', this.currentPropertyId]);

            }else{
              this.router.navigate(['/home']);
            }
            
            this.spinner.hide();
          }
        });
   }
  }
}
