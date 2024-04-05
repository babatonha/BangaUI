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
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { PasswordInputComponent } from '../../../shared/forms/password-input/password-input.component';
import { AccountService } from '../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { changePassword } from '../../../_models/changePassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
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
export class ChangePasswordComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,  
    private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.spinner.show();
      const model: changePassword  = this.myForm.value;
      this.accountService.changePassword(model).subscribe({
        next: () =>{
          this.toastr.success("Successfully changed!");
          this.router.navigate(['/login']);
          this.spinner.hide();
        }
      })

    }
  }

}
