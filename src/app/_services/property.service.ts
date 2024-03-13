import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Property } from "../_models/property";
import { SearchFilter } from "../_models/searchFilter";

@Injectable({
    providedIn: 'root'
  })
  export class PropertyService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    getFilteredProperties(filter: SearchFilter){
        return this.http.post<any>(`${this.baseService.baseUrl}Property/FilteredSearch`, filter);
    }

    getPropertyById(propertyId: number){
      return this.http.get<any>(`${this.baseService.baseUrl}Property/${propertyId}`);
    }
    
    createProperty(property: Property){
      return this.http.post<any>(`${this.baseService.baseUrl}Property`, property);
    }
  }