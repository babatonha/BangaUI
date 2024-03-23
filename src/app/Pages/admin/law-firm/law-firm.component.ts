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

@Component({
  selector: 'app-law-firm',
  templateUrl: './law-firm.component.html',
  styleUrls: ['./law-firm.component.scss'],
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
    MatTooltipModule
  ]
})
export class LawFirmComponent implements OnInit {

  displayedColumns: string[] = ['lawFirmName', 'address','actions'];
  dataSource!: MatTableDataSource<LawFirm>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    private lawFirmService: LawFirmService,
    private spinner: NgxSpinnerService) {}


  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createNew(){
    this.router.navigate(['/law-firm-new']);
  }

  getAll(){
    this.spinner.show(); 
    this.lawFirmService.getAllLawFirms().subscribe({
      next: response => {
        this.dataSource = new MatTableDataSource(response);
        this.spinner.hide();
      }
    })
  }

  update(propertyId: number){
    this.router.navigate(['/law-firm-new']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
