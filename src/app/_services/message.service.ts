import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Offer } from "../_models/offer";
import { getPaginatedResult, getPaginationHeaders } from "../_helpers/paginationHelper";
import { Message } from "../_models/message";


@Injectable({
    providedIn: 'root'
  })
  export class MessageService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    getMessages(pageNumber: number, pageSize: number, container: string){
        let params = getPaginationHeaders(pageNumber, pageSize);
        params = params.append('Container', container);
        return getPaginatedResult<Message[]>(this.baseService.baseUrl + 'Messages',params, this.http);
    }

    getMessageThread(username: string){
        return this.http.get<Message[]>(`${this.baseService.baseUrl}Messages/thread/${username}`)
    }

    sendMessage(username: string, content: string){
        return this.http.post<Message>(`${this.baseService.baseUrl}Messages`, {recipientUsername: username, content})
    }

    deleteMessage(messageId: number){
        return this.http.delete(`${this.baseService.baseUrl}Messages/${messageId}`)
    }

}