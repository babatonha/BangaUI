import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRole } from '../../../_models/userRole';
import { UserService } from '../../../_services/user.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-assign-user-role',
  templateUrl: './assign-user-role.component.html',
  styleUrls: ['./assign-user-role.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    TextInputComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ]
})
export class AssignUserRoleComponent implements OnInit {
  myForm!: FormGroup;
  roles: string[] = ['Admin', 'User', 'Lawyer'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: UserRole,
  private fb: FormBuilder,
  private toastr: ToastrService,
  private spinner: NgxSpinnerService, 
  private userService: UserService,
  public dialog: MatDialog,) { }

  ngOnInit() {
    this.generateForm();
  }

  generateForm(){
    this.myForm = this.fb.group({
      roleName : ['', Validators.required]
    });
  }

  
 onSubmit(){
  if(this.myForm.valid){
    const roleName  = this.myForm.value.roleName;
    const userId = this.data.id;

    this.spinner.show();
      this.userService.assignUserRole(userId, roleName).subscribe({
        next: response => {
          this.toastr.success("Successfully Assigned");
          this.dialog.closeAll();
          this.spinner.hide();
        }
      })
    }
  }

}



