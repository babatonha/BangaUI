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
import { LawFirm } from '../../../_models/lawFirm';
import { City } from '../../../_models/city';
import { LocationService } from '../../../_services/location.service';
import { UserService } from '../../../_services/user.service';
import { User } from '../../../_models/user';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LawFirmService } from '../../../_services/lawFirm.service';

@Component({
  selector: 'app-lawfirm-new',
  templateUrl: './lawfirm-new.component.html',
  styleUrls: ['./lawfirm-new.component.scss'],
  standalone:true,
  imports:[
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
export class LawfirmNewComponent implements OnInit {
  lawFirm: LawFirm | undefined;
  myForm!: FormGroup;
  cities: City[] = [];
  users: User[] = [];

  constructor(private fb: FormBuilder,
    private usersService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private locationService: LocationService,
    private lawfirmService: LawFirmService) { }

  ngOnInit() {
    this.getCities();
    this.getUsers();
    this.generateForm();
  }

  generateForm(){
    this.myForm = this.fb.group({
      lawFirmID : [0],
      logoUrl : [''],
      lawFirmName : ['',  [Validators.required]],
      description :['', [Validators.required]],
      representativeUserId : [0,  [Validators.required]],
      address : ['', [Validators.required]],
      cityID :[0,  [Validators.required]],
    });
  }

  getCities(){
    this.locationService.getAllCitites().subscribe({
      next: (response) => {
          this.cities = response;
      }
    });
  }

  getUsers(){
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
          this.users = response;
      }
    });
  }

  changeProfilePicture(){

  }

  onSubmit(){
    if (this.myForm.valid) {
      this.spinner.show();
      this.lawFirm = this.myForm.value;

      this.lawfirmService.createLawFirm(this.lawFirm!).subscribe({
          next: () => {  
            this.toastr.success("Successfully Saved!");  
            this.router.navigate(['/law-firm']);
            this.spinner.hide();
          }
      });
    }
  }


}


