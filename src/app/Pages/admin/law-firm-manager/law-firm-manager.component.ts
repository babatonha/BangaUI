import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LawFirm } from '../../../_models/lawFirm';
import { LawFirmService } from '../../../_services/lawFirm.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { merge, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-law-firm',
  templateUrl: './law-firm-manager.component.html',
  styleUrls: ['./law-firm-manager.component.scss'],
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
    MatMenuModule,
    MatTooltipModule
  ]
})
export class LawFirmManagerComponent implements OnInit {
  displayedColumns: string[] = ['lawFirmName', 'address','actions'];
  dataSource!: MatTableDataSource<LawFirm>;
  dataSize : number = 0
  currentPage: number = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    private lawFirmService: LawFirmService,
    private spinner: NgxSpinnerService) {}


  ngOnInit() {
    this.getAll();
  }

  createNew(){
    this.router.navigate(['/law-firm-new']);
  }

  getAll(){
    this.spinner.show(); 
    this.lawFirmService.getAllLawFirms().subscribe({
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

  update(propertyId: number){
    this.router.navigate(['/law-firm-new']);
  }

  handlePageChange(event: any) {
    this.getAll();
   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
