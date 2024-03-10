import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";


@Injectable({
    providedIn: 'root'
  })
  export class LawFirmService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    getAllLawFirms(){
        return this.http.get<any>(`${this.baseService.baseUrl}LawFirm/`);
    }
  }