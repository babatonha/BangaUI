import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone:true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
