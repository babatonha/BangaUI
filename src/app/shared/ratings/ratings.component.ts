import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    MatIconModule
  ]
})
export class RatingsComponent implements OnInit {

  @Output() rated: EventEmitter<number> = new EventEmitter<number>();
  @Input() selectedStar: number = -1;
  stars: number[] = [1, 2, 3, 4, 5];
  colorClass: string = '';


  constructor() { }

  ngOnInit() {
  }

  fillStars(index: number) {
    // this.selectedStar = index;
    // this.setColorClass();
  }

  rateStar(index: number) {
    // this.selectedStar = index;
    // this.rated.emit(this.selectedStar + 1);
    // this.setColorClass();
  }



}
