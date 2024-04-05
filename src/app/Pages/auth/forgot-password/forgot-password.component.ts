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
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { PasswordInputComponent } from '../../../shared/forms/password-input/password-input.component';
import { AccountService } from '../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
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
  ]
})
export class ForgotPasswordComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,  
    private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.spinner.show();
      const usernameOrPassword = this.myForm.value.username;
      this.accountService.forgotPassword(usernameOrPassword).subscribe({
        next: () =>{
          this.toastr.success("Password recovered, Please check your email!");
          this.router.navigate(['/change-password']);
          this.spinner.hide();
        }
      })

    }
  }

}
