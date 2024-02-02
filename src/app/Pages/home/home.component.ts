import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { CardComponent } from '../../shared/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    UserComponent,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    SearchBarComponent,
    CardComponent,
    MatInputModule,
    MatDatepickerModule,
    MatGridListModule,
  ],
})
export class HomeComponent implements OnInit {
  cardsData = [
    { id: 1, title: 'Card 1', content: 'Lorem ipsum dolor sit amet.' },
    { id: 2, title: 'Card 2', content: 'Consectetur adipiscing elit.' },
    {
      id: 3,
      title: 'Card 3',
      content:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    },
    // Add more cards as needed
  ];
  constructor() {}

  ngOnInit() {}
}
