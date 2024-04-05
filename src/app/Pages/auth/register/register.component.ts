import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { PasswordInputComponent } from '../../../shared/forms/password-input/password-input.component';
import { Register } from '../../../_models/register';
import { AccountService } from '../../../_services/account.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone:true,
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
    PasswordInputComponent,
    NgxSpinnerModule
  ],
})
export class RegisterComponent implements OnInit {
  registerModel!:  Register;
  hide = true;


  myForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,  
    private accountService: AccountService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{4,10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]]
    });
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.spinner.show();  
      this.registerModel = this.myForm.value;

    this.accountService.register(this.registerModel).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
          this.spinner.hide();  
        }
      });
    }
  }

}
