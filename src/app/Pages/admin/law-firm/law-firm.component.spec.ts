/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LawFirmComponent } from './law-firm.component';

describe('LawFirmComponent', () => {
  let component: LawFirmComponent;
  let fixture: ComponentFixture<LawFirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawFirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
