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
import { Property } from '../../../_models/property';
import { PropertyService } from '../../../_services/property.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DefaultSearchFilter } from '../../../_static/searchFilterDefaultData';
import { merge, of, startWith, switchMap } from 'rxjs';
import { ManagePropertyModel } from '../../../_models/manageProperty';

@Component({
  selector: 'app-property-manager',
  templateUrl: './property-manager.component.html',
  styleUrls: ['./property-manager.component.scss'],
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
export class PropertyManagerComponent implements OnInit {

  displayedColumns: string[] = ['propertyId','ownerName', 'price','actions'];
  dataSource!: MatTableDataSource<Property>;
  dataSize : number = 0
  currentPage: number = 0;
  pageSize: number = 10;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 

  constructor(
    private propertyService: PropertyService,
    public dialog: MatDialog,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.getAllProperties();
  }

  getAllProperties(){
    this.spinner.show(); 
    const search = DefaultSearchFilter.getDefaultSearchFilter();
    this.propertyService.getFilteredProperties(search).subscribe({
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
    this.getAllProperties();
   }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  manageProperty(propertyId: number, isActive: boolean, isSold: boolean){
    this.spinner.show();
    const manager: ManagePropertyModel = {propertyId, isActive, isSold }
    this.propertyService.manageProperty(manager).subscribe({
      next: () => {
        this.getAllProperties();
        this.toastr.success("Succesfully updated");
        this.spinner.hide();
      }
    })

  }


}
