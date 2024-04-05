import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDetails } from '../../../_models/user-details';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { UserService } from '../../../_services/user.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { merge, of, startWith, switchMap } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AssignUserRoleComponent } from '../assign-user-role/assign-user-role.component';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    ConfirmDialogComponent
  ]

})
export class UserManagerComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName','email','actions'];
  dataSource!: MatTableDataSource<UserDetails>;
  dataSize : number = 0
  currentPage: number = 0;
  pageSize: number = 10;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService) {}


    ngOnInit() {
      this.getAllUsers();
    }
  
  
    createNew(){
    }
  
    getAllUsers(){
      this.spinner.show(); 
      this.userService.getAllUsers().subscribe({
        next: response => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSize =  this.dataSource.data.length;
          this.linkListToPaginator();
          this.spinner.hide();
        }
      })
    }
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    handlePageChange(event: any) {
     this.getAllUsers();
    }

    linkListToPaginator() {
      merge(this.paginator.page).pipe(
        startWith({}),
        switchMap(() => {
          return of(this.dataSource.data);
        })
      ).subscribe(res => {
        const from = this.paginator.pageIndex * this.paginator.pageSize;
        const to = from + this.paginator.pageSize;
        this.dataSource.data = res.slice(from, to);
      });
    }

    openRoleDialog(userId: number) {     
      this.dialog.open(AssignUserRoleComponent, 
        {
          data: {
            id : userId,
            roleName: ''
          }
        });
    }

    openBlockUserDialog(id: number, email: string, isBlocked: boolean) {
      const dialogRef =  this.dialog.open(ConfirmDialogComponent, 
         {
           data: {
             title : isBlocked? "Unblock User" : "Block User",
             content: `Are you sure you want to ${isBlocked? "unblock" : "block"} the user with email ${email}?`
           }
         });
   
         const blockValue = !isBlocked;
         dialogRef.componentInstance.onConfirm.subscribe(() => {
           this.spinner.show();
           this.userService.blockUser(id, blockValue).subscribe({
             next: () =>{
               dialogRef.close(true);
               this.spinner.hide();
               this.getAllUsers();
               this.toastr.success(`Succesfully ${isBlocked? "unblocked" : "blocked"}`)
             }
           })
         });
     }

}
