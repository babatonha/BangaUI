import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Register } from '../_models/register';
import { Login } from '../_models/login';
import { User } from '../_models/user';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

private currentUserSource = new BehaviorSubject<User |null>(null);//allows us to give an initial value to use somewhere else;
currentUser$ = this.currentUserSource.asObservable(); //dollar sign shows that its a behaviour subject item.

constructor(private baseService: BaseService,
  private http: HttpClient) { }

  register(model: Register){
    return this.http.post(`${this.baseService.baseUrl}account/register`,model);
  }

  login(model: Login){
    return this.http.post<User>(`${this.baseService.baseUrl}account/login`,model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }
  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }

}
