import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Property } from "../_models/property";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    getAllUsers(){
        return this.http.get<any>(`${this.baseService.baseUrl}User/`);
    }

  }