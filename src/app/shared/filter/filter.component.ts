import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TextInputComponent } from '../forms/text-input/text-input.component';
import { PropertyType } from '../../_models/propertyType';
import { RegistrationType } from '../../_models/registrationType';
import { PropertyTypeService } from '../../_services/propertyType.service';
import { MatSelectModule } from '@angular/material/select';
import { SearchFilter } from '../../_models/searchFilter';
import { Property } from '../../_models/property';
import { Router } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatListModule,
    TextInputComponent,
    MatSelectModule
  ]
})
export class FilterComponent implements OnInit {
  myForm!: FormGroup;
  propertyTypes: PropertyType[] = [];
  registrationTypes: RegistrationType[] = [];
  prices: number[] = [3000, 5000, 10000, 20000, 50000, 100000, 250000,500000, 750000, 1000000, 2000000,5000000,10000000,20000000,50000000];
  numberDataSource = [{id: 1, display:"1+"}, {id: 2, display:"2+"}, {id: 3, display:"3+"}, {id: 4, display:"4+"}, {id: 5, display:"5+"}]

  @Input() locations: string[] = [];

  @Output() triggerUpdateSearchFilter: EventEmitter<SearchFilter> = new EventEmitter<SearchFilter>();
  @Output() triggerUpdatePropertyList: EventEmitter<Property[]> = new EventEmitter<Property[]>();

  isApplyFilters: boolean = false;
  loggedInUser: User | undefined;


  constructor(private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private propertyTypeSrvice: PropertyTypeService,) { }

  ngOnInit() {
    this.getPropertyTypes();
    this.getRegistrationTypes();
    this.generateForm();
    this.hideFilters();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      next: user => {
        if(user){
          this.loggedInUser = user;
        }
      },
      error: error =>{
       // console.log(error);
      }
    })
  }


  hideFilters(){
    var x: any = document.getElementById("filters");
    x.style.display = "none";
    this.isApplyFilters = false;
  }

  generateForm(){
    this.myForm = this.fb.group({
      propertyTypeId: [0],
      registrationTypeId:  [0],
      maxPrice:  [0],
      minPrice:  [0],
      beds:[0],
      baths:[0]
    });
    this.triggerUpdateSearchFilter.emit(this.myForm.value);
  }

  getPropertyTypes(){
    this.propertyTypeSrvice.getAllPropertyTypes().subscribe({
      next: (response) => {
          this.propertyTypes = response;
      }
    });
  }

  getRegistrationTypes(){
    this.propertyTypeSrvice.getAllRegistrationTypes().subscribe({
      next: (response) => {
          this.registrationTypes = response;
      }
    });
  }

  refreshFormOnValueChange(){
    this.triggerUpdateSearchFilter.emit(this.myForm.value);
  }

  onFilterSubmit(){
    if(this.myForm.valid){
      this.triggerUpdatePropertyList.emit();
    }
  }

  toggleFilters(){
    var x: any = document.getElementById("filters");
    if (x.style.display === "none") {
      x.style.display = "block";
      this.isApplyFilters = true;
    } else {
      x.style.display = "none";
      this.isApplyFilters = false;
    }
  }

  createNewProperty(){
    this.router.navigate(['/property-new']);
  }

}
