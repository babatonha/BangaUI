import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AccountService } from '../../_services/account.service';
import { Login } from '../../_models/login';
import { User } from '../../_models/user';
import { Router, RouterModule } from '@angular/router';

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
    RouterModule
  ],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginModel!: Login;
  myForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private accountService: AccountService,
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
      this.accountService.login(this.loginModel).subscribe({
        next: response =>{
          this.router.navigate(['/home']);
        },
        error: error => {
          if(error && error.status === 401){
            
          }
        }
      })

    }
  }

}
