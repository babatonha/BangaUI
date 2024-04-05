import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessagesComponent } from '../messages/messages.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { UserService } from '../../../_services/user.service';
import { AccountService } from '../../../_services/account.service';
import { UserDetails } from '../../../_models/user-details';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MessagesComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TextInputComponent,
    NgxSpinnerModule
  ]
})
export class UserProfileComponent implements OnInit {
  tabIndex: number = 0;
  myForm!: FormGroup;
  currentUserId?: number;
  userDetails?: UserDetails;

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private toastr: ToastrService,
    private spinner: NgxSpinnerService, 
    private accountService: AccountService) { }

  ngOnInit() {
    this.generateForm();
    this.getCurrentUser();  
  }

  generateForm(){
    this.myForm = this.fb.group({
      id : [0],
      userName : [''],
      email : [''],
      fullName : [''],
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      roles: [''],
      phoneNumber: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
    });
  }


  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      next: user => {
        if(user){
          this.currentUserId = user.id;
          this.getUser(user.id);  
        }
      },
      error: error =>{}
    })
  }

  getUser(id: number){
    this.userService.getUser(id).subscribe({
      next: user => {
        this.myForm.patchValue(user);
        this.userDetails = user;
      }
    })
  }

  changeProfilePicture(){

  }

  onSubmit(){

    if(this.myForm.valid){
      this.spinner.show();
      this.userService.createUser(this.myForm.value).subscribe({
        next: () => {
          this.getUser(this.currentUserId!);
          this.toastr.success("Succesfully updated");
          this.spinner.hide();
        }
      })
    }

  }

}
