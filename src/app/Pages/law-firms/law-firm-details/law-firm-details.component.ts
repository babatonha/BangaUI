import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LawFirmService } from '../../../_services/lawFirm.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LawFirm } from '../../../_models/lawFirm';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RatingsComponent } from '../../../shared/ratings/ratings.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../../../_services/account.service';
import { RatingNewComponent } from '../rating-new/rating-new.component';
import { LawFirmRating } from '../../../_models/rating';

@Component({
  selector: 'app-law-firm-details',
  templateUrl: './law-firm-details.component.html',
  styleUrls: ['./law-firm-details.component.scss'],
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
export class LawFirmDetailsComponent implements OnInit {
  lawFirmId: number = 0;
  lawFirm: LawFirm | undefined;
  currentUserId: number | undefined;
  lawFirmRatings: LawFirmRating[] = [];

  constructor(private lawFirmService: LawFirmService, 
    private route: ActivatedRoute, 
    private toastr: ToastrService, 
    private accountService: AccountService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.lawFirmId = +params['id'];

      this.lawFirm = this.lawFirmService.getFirmsData().find(X => X.lawFirmID === this.lawFirmId);
      
      if(!this.lawFirm){
        this.getLawfirmById(this.lawFirmId);
      }

      this.getCurrentUser();
      this.getLawFirmRatings(this.lawFirmId);
    });
  }

    getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      next: user => {
        if(user){
          this.currentUserId = user.id;
        }
      },
      error: error =>{}
    })
  }


  getLawFirmRatings(lawFirmId: number){
    this.spinner.show(); 
    this.lawFirmService.getLawFirmRatings(lawFirmId).subscribe({
      next: response => {
        this.lawFirmRatings = response;
        this.spinner.hide();
      }
    })
  }

  getLawfirmById(id: number){
    this.spinner.show(); 
    this.lawFirmService.getLawFirmById(id).subscribe({
      next: response => {
        this.lawFirm = response;
        this.spinner.hide();
      }
    })
  }

  openDialog() { 
    this.dialog.open(RatingNewComponent, 
      {
        data: {
          ratingId: 0,
          lawFirmId: this.lawFirm?.lawFirmID,
          userId: this.currentUserId,
          rating: 0,
          review: '',
          userName: '',
          userFullName: ''
        }
      });
  }
}
