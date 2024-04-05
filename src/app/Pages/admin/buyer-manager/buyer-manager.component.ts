import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { BuyerListing } from '../../../_models/buyerListing';
import { BuyerListingService } from '../../../_services/buyerListing.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { merge, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-buyer-manager',
  templateUrl: './buyer-manager.component.html',
  styleUrls: ['./buyer-manager.component.scss'],
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

export class BuyerManagerComponent implements OnInit {

  displayedColumns: string[] = ['buyerListingId','budget', 'description','actions'];
  dataSource!: MatTableDataSource<BuyerListing>;
  dataSize : number = 0
  currentPage: number = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private buyerListingService: BuyerListingService,
    public dialog: MatDialog,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.getAllListings();
  }

  getAllListings(){
    this.spinner.show(); 
    this.buyerListingService.getAllBuyerListings().subscribe({
      next: response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSize =  this.dataSource.data.length;
        this.linkListToPaginator();
        this.spinner.hide();
      }
    })

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
  
  handlePageChange(event: any) {
    this.getAllListings();
   }

   deleteBuyerListing(buyerListingId: number){
    this.spinner.show();
    this.buyerListingService.deleteBuyerListing(buyerListingId).subscribe({
      next: () => {
        this.getAllListings();
        this.toastr.success("Succesfully deleted");
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

}
