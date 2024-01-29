import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone:true,
  imports:[CommonModule, HttpClientModule]
})
export class UserComponent implements OnInit {
  users:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://localhost:7079/api/users').subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
       // console.log(error);
      },
      complete: () => {
       // console.log("request completed");
      }
    });
  }

}
