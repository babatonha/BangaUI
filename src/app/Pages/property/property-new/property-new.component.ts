import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Property } from '../../../_models/property';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { City } from '../../../_models/city';
import { PropertyType } from '../../../_models/propertyType';
import { LawFirm } from '../../../_models/lawFirm';
import { PropertyTypeService } from '../../../_services/propertyType.service';
import { LocationService } from '../../../_services/location.service';
import { LawFirmService } from '../../../_services/lawFirm.service';
import { PropertyService } from '../../../_services/property.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from '../../../shared/photo-editor/photo-editor.component';
import {MatStepperModule} from '@angular/material/stepper';
import { PropertyPhoto } from '../../../_models/propertyPhoto';
import { PropertyPhotoService } from '../../../_services/propertyPhoto.service';

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
  propertyId: number = 1;

  isLinear: boolean = false;

  constructor(private fb: FormBuilder,
    private propertyService: PropertyService,
    private propertyTypeSrvice: PropertyTypeService,
    private propertyPhotoService: PropertyPhotoService,
    private locationService: LocationService,
    private lawFirmService: LawFirmService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCities();
    this.getPropertyTypes();
    this.getLawFirms();
    this.generatePropertyForm();
    this.getPropertyPhotos();
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
    });
  }

  getCities(){
    this.locationService.getAllCitites().subscribe({
      next: (response) => {
          this.cities = response;
      }
    });
  }

  getPropertyTypes(){
    this.propertyTypeSrvice.getAllPropertyTypes().subscribe({
      next: (response) => {
          this.propertyTypes = response;
      }
    });
  }

  getLawFirms(){
    this.lawFirmService.getAllLawFirms().subscribe({
      next: (response) => {
          this.lawFirms = response;
      }
    });
  }

  getPropertyPhotos(){
    this.propertyPhotoService.getPropertyPhotos(this.propertyId).subscribe({
      next: response =>{
        this.propertyPhotos = response;
      }
    })
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.spinner.show();
      this.newRecord = this.myForm.value;

      this.propertyService.createProperty(this.newRecord).subscribe({
          next: () => {  
            this.toastr.success("Successfully Saved!");  
            this.router.navigate(['/home']);
            this.spinner.hide();
          }
        });
      }
  }
}
