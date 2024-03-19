import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Offer } from '../../../_models/offer';
import { ToastrService } from 'ngx-toastr';
import { OfferService } from '../../../_services/offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
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
export class OfferListComponent implements OnInit {


  @Input() dataSource!: MatTableDataSource<Offer>;
  displayedColumns: string[] = ['buyerName', 'amount','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private toastr: ToastrService,
    private spinner: NgxSpinnerService, 
    private offerService: OfferService,) { }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  acceptOffer(propertyOfferId: number){
    if(propertyOfferId){
      const offer = this.dataSource.data.filter(x => x.propertyOfferId === propertyOfferId)[0];

      if(offer){
        offer.isAccepted =true;
        this.spinner.show();
        this.offerService.createOffer(offer).subscribe({
          next: response => {
            this.toastr.success("Successfully Accepted");
            this.spinner.hide();
          }
        })
      }
    }

  

  }

}
