import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { OfferService } from '../../../_services/offer.service';
import { AccountService } from '../../../_services/account.service';
import { UserOffers } from '../../../_models/userOffers';
import { MatMenuModule } from '@angular/material/menu';
import { OfferTemplateComponent } from '../../../shared/offer-template/offer-template.component';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss'],
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
    MatTooltipModule,
    OfferTemplateComponent
  ]
})
export class MyOffersComponent implements OnInit {
   dataSource!: MatTableDataSource<UserOffers>;
  displayedColumns: string[] = ['address', 'price', 'amount','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  currentUserId: number | undefined;
  

  constructor(private toastr: ToastrService,
    private spinner: NgxSpinnerService, 
    private offerService: OfferService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.currentUser$.subscribe({
      next: user => {
        if(user){
          this.getUserOffers(user.id);
          this.currentUserId = user.id;
        }
      },
      error: error =>{}
    })

  }

  getUserOffers(userId: number){
    this.spinner.show();
    this.offerService.getUserOffers(userId).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      }
    })
  }

  comfirmOffer(offerId: number, isOfferConfirmed: boolean){
    this.spinner.show();
    this.offerService.confirmOffer(offerId, !isOfferConfirmed).subscribe({
      next: (data) => {
        isOfferConfirmed ? this.toastr.success("Successfully unconfirmed!") : this.toastr.success("Successfully confirmed!");  
        if(this.currentUserId){
          this.getUserOffers(this.currentUserId);
        }
        this.spinner.hide();
      }
    })
  }

  downloadOffer(offerId: number){
    
  }

}
