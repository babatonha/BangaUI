import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class PropertyDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}




