import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Register } from '../_models/register';
import { Login } from '../_models/login';
import { User } from '../_models/user';
import { BehaviorSubject, map } from 'rxjs';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

private currentUserSource = new BehaviorSubject<User |null>(null);
currentUser$ = this.currentUserSource.asObservable(); 

constructor(private baseService: BaseService,
  private presenceService: PresenceService,
  private http: HttpClient) { }

  register(model: Register){
    return this.http.post<User>(`${this.baseService.baseUrl}account/register`,model).pipe(
      map(response => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  login(model: Login){
    return this.http.post<User>(`${this.baseService.baseUrl}account/login`,model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }
  setCurrentUser(user: User){
    // user.roles = [];
    // const roles = this.getDecodedToken(user.token).role;
    // Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    this.presenceService.createHubConnection(user);
  }

  logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
    this.presenceService.stopHubConnection();
  }

}
