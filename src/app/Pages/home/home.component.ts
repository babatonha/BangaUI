import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, UserComponent],  
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { 
  }

}
