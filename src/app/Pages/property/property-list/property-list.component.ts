import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PropertyDetailComponent } from '../property-detail/property-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Property } from '../../../_models/property';
import { PropertyService } from '../../../_services/property.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
  standalone: true,
  imports:[CommonModule,
     PropertyDetailComponent,
     CommonModule,
     MatCardModule,
     MatButtonModule,
     MatFormFieldModule,
     MatInputModule,
     MatDatepickerModule,
     MatGridListModule,
     MatListModule,
     MatIconModule,
     MatPaginatorModule]
})
export class PropertyListComponent implements OnInit {

  propertyDatasource : Property[] = []

  constructor(private propertyService: PropertyService,
    private router: Router) {}

  ngOnInit() {
    this.propertyService.getAllProperties().subscribe({
      next: response => {
        this.propertyDatasource = response;
      }
    })
  }

  navigateToDetails(id: number){
    this.router.navigate(['/property-detail', id])
  }
}
