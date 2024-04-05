import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { PasswordInputComponent } from '../../../shared/forms/password-input/password-input.component';
import { Login } from '../../../_models/login';
import { AccountService } from '../../../_services/account.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    TextInputComponent,
    PasswordInputComponent,
    NgxSpinnerModule
  ],
})
export class LoginComponent implements OnInit {
  loginModel!: Login;
  myForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.loginModel = this.myForm.value;
      this.spinner.show();
      this.accountService.login(this.loginModel).subscribe({
        next: () =>{
          this.router.navigate(['/home']);
          this.spinner.hide();  
        }
      })
    }
  }

}
