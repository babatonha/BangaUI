/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RatingNewComponent } from './rating-new.component';

describe('RatingNewComponent', () => {
  let component: RatingNewComponent;
  let fixture: ComponentFixture<RatingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
