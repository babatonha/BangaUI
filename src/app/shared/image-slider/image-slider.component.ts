import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgImageSliderModule } from 'ng-image-slider';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  standalone: true,
  imports:[
    FormsModule, NgImageSliderModule, CommonModule
  ],
})
export class ImageSliderComponent implements OnInit {

  @Input() imageObject: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
