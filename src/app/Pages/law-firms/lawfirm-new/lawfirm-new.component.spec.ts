/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LawfirmNewComponent } from './lawfirm-new.component';

describe('LawfirmNewComponent', () => {
  let component: LawfirmNewComponent;
  let fixture: ComponentFixture<LawfirmNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawfirmNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawfirmNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
