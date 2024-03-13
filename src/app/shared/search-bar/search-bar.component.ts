import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {  MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { TextInputComponent } from '../forms/text-input/text-input.component';
import { LocationService } from '../../_services/location.service';
import { Property } from '../../_models/property';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatListModule,
    TextInputComponent

  ],
})


export class SearchBarComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  locationCtrl = new FormControl('');
  filteredLocations!: Observable<string[]>;
  locations : string[] = [];
  allLocations:   string[] = [];
  @Output() triggerUpdatePropertyList: EventEmitter<Property[]> = new EventEmitter<Property[]>();
  @Output() triggerUpdateLocations: EventEmitter<string[]> = new EventEmitter<string[]>();

  @ViewChild('locationInput') locationInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);
  
  constructor(private locationService: LocationService){
      this.filterLocations();
  }

  ngOnInit() {
   this.getCitySuburbs();
  }

  filterLocations(){
    this.filteredLocations = this.locationCtrl.valueChanges.pipe(
      startWith(null),
      map((locationName: string | null) => {
        if (locationName && locationName.length >= 3) {
          return this._filter(locationName);
        } else {
          return [];
        }
      }),
    );
  }

  
  getCitySuburbs(){
    this.locationService.getAllCitySuburbs().subscribe({
      next: response => {
        this.allLocations = response;
      }
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.locations.push(value);
    }

    event.chipInput!.clear();

    this.locationCtrl.setValue(null);
  }

  remove(location: string): void {
    const index = this.locations.indexOf(location);

    if (index >= 0) {
      this.locations.splice(index, 1);

      this.announcer.announce(`Removed ${location}`);
      this.triggerUpdateLocations.emit(this.locations);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.locations.push(event.option.viewValue);
    this.locationInput.nativeElement.value = '';
    this.locationCtrl.setValue(null);
    this.triggerUpdateLocations.emit(this.locations);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLocations.filter(location => location.toLowerCase().includes(filterValue));
  }

  searchRecords(){
    this.triggerUpdatePropertyList.emit();
  }
}

