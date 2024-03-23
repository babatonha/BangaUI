import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LawFirm } from '../../../_models/lawFirm';
import { LawFirmService } from '../../../_services/lawFirm.service';
import { Router } from '@angular/router';
import { RatingsComponent } from '../../../shared/ratings/ratings.component';

@Component({
  selector: 'app-law-firm-listing',
  templateUrl: './law-firm-listing.component.html',
  styleUrls: ['./law-firm-listing.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    RatingsComponent
  ]
})
export class LawFirmListingComponent implements OnInit {

  datasource: LawFirm[] =  [];

  constructor(  private lawFirmService: LawFirmService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getAllLawfirms();
  }

  getAllLawfirms(){
    this.spinner.show(); 
    this.lawFirmService.getAllLawFirms().subscribe({
      next: response => {
        this.datasource = response;
        this.lawFirmService.setLawFirmData(this.datasource);
        this.spinner.hide();
      }
    })
  }

  onItemClick(id: number){
    this.router.navigate(['/law-firm-detail', id]);
  }


}
