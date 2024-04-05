import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { LawFirmManagerComponent } from '../law-firm-manager/law-firm-manager.component';
import { UserManagerComponent } from '../user-manager/user-manager.component';
import { PropertyManagerComponent } from '../property-manager/property-manager.component';
import { BuyerManagerComponent } from '../buyer-manager/buyer-manager.component';


@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    LawFirmManagerComponent,
    UserManagerComponent,
    PropertyManagerComponent,
    BuyerManagerComponent
  ]
})
export class AdminSettingsComponent implements OnInit {
  tabIndex: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
