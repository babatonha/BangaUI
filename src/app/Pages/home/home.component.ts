import { Component, OnInit } from '@angular/core';
import { PropertyListComponent } from '../property/property-list/property-list.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    PropertyListComponent,
    SearchBarComponent
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {

  }
}
