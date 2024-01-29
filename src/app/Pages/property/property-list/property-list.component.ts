import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PropertyDetailComponent } from '../property-detail/property-detail.component';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
  standalone: true,
  imports:[CommonModule, PropertyDetailComponent]
})
export class PropertyListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
