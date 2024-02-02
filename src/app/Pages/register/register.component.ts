import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Register } from '../../_models/register';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { AccountService } from '../../_services/account.service';
import { Router, RouterModule } from '@angular/router';

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
    RouterModule
  ],
})
export class RegisterComponent implements OnInit {
  registerModel!:  Register;
  hide = true;


  myForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]]
    });
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.registerModel = this.myForm.value;

    this.accountService.register(this.registerModel).subscribe({
        next: (response) => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          if(error.status == 400){
            console.log(error.statusMessage)
          }
        }
      });
    }
  }

}
