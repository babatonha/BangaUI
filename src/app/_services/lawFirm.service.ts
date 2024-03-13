import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { LawFirm } from "../_models/lawFirm";


@Injectable({
    providedIn: 'root'
  })
  export class LawFirmService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    getAllLawFirms(){
        return this.http.get<any>(`${this.baseService.baseUrl}LawFirm/`);
    }

    createLawFirm(lawFirm: LawFirm){
      return this.http.post<any>(`${this.baseService.baseUrl}LawFirm/`, lawFirm);
    }

    updateLawFirm(lawFirm: LawFirm){
      return this.http.put<any>(`${this.baseService.baseUrl}LawFirm/`, lawFirm);
    }
  }