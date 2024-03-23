import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss'],
  standalone: true,
  imports:[
    CommonModule
  ]
})
export class AdminSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
