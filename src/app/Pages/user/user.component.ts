import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone:true,
  imports:[CommonModule]
})
export class UserComponent implements OnInit {
  users:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://localhost:7079/api/user').subscribe({
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
