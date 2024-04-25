import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertyDetailComponent } from '../property-detail/property-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Property } from '../../../_models/property';
import { PropertyService } from '../../../_services/property.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { SearchFilter } from '../../../_models/searchFilter';
import { DefaultSearchFilter } from '../../../_static/searchFilterDefaultData';
import { startWith, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { ImageSliderComponent } from '../../../shared/image-slider/image-slider.component';



@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
  standalone: true,
  imports:[CommonModule,
    PropertyDetailComponent,
    SearchBarComponent,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    NgxSpinnerModule,
    FilterComponent,
    ImageSliderComponent
  ]
})
export class PropertyListComponent implements OnInit {

  propertyDatasource : Property[] = [];
  locations: string[] = [];
  searchFilter: SearchFilter = DefaultSearchFilter.getDefaultSearchFilter();

  @ViewChild(SearchBarComponent) searchBarComponent!: SearchBarComponent;

  dataSize : number = 0
  currentPage: number = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private propertyService: PropertyService,
    private router: Router,
    private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.getAllProperties();
    this.linkListToPaginator();
  }

  getAllProperties(){
    this.spinner.show(); 
    this.propertyService.getFilteredProperties(this.searchFilter).subscribe({
      next: response => {
        this.propertyDatasource = response;
        this.dataSize =  this.propertyDatasource.length;
        this.linkListToPaginator();
        this.spinner.hide();
      }
    })
  }

  navigateToDetails(id: number){
    this.router.navigate(['/property-detail', id])
  }

  refreshFilteredProperties(){
    this.spinner.show();
    this.searchFilter.searchTerms = this.locations;
    this.propertyService.getFilteredProperties(this.searchFilter).subscribe({
      next: response => {
        this.propertyDatasource = response;
        this.dataSize =  this.propertyDatasource.length;
        this.linkListToPaginator();
        this.spinner.hide();
      },
      error: error =>{
        this.propertyDatasource = [];
        this.spinner.hide();
      } 
    })
  }

  refreshSearchFilter(data :any){
    this.searchFilter = data;
  }

  refreshLocations(data: any){
   this.locations  = data ? data : []; 
  }

  handlePageChange(e:any){
    this.refreshFilteredProperties();

  }

  linkListToPaginator() {
    merge(this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return of(this.propertyDatasource);
      })
    ).subscribe(res => {
      const from = this.paginator.pageIndex * this.pageSize;
      const to = from + this.pageSize;
      this.propertyDatasource = res.slice(from, to);
    });
  }

}
