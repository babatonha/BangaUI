import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MessagesComponent
  ]
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
