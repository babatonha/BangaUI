/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LawFirmListingComponent } from './law-firm-listing.component';

describe('LawFirmListingComponent', () => {
  let component: LawFirmListingComponent;
  let fixture: ComponentFixture<LawFirmListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawFirmListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
