import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Message } from '../../../_models/message';
import { Pagination } from '../../../_models/pagination';
import { MessageService } from '../../../_services/message.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatListModule
  ]
})
export class MessagesComponent implements OnInit {
  messages?: Message[] ;
  pagination?: Pagination;
  container =  "Inbox";
  pageNumber = 1;
  pageSize = 5;

  tabIndex: number = 0;

  constructor(private messageService: MessageService,
    private router: Router,) { }

  ngOnInit() {
    this.loadMessages();
  }

  messageClicked(data: Message){
    const username  = this.tabIndex === 1 ? data.recipientUsername : data.senderUsername;
    this.navigateToMessagesThread(username);
  }

  navigateToMessagesThread(id: string){
    this.router.navigate(['/messages', id])
  }

  loadMessages(){
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next:  response => {
        this.messages = response.result;
        this.pagination = response.pagination;
      }
    })
  }


  tabSelectionChanged(e:any){
    if(e.index){
      this.tabIndex = e.index;
      this.container = e.index === 0 ? "Inbox" : e.index === 1 ? "Outbox" : "Unread";
      this.loadMessages();
    }
  }

  pageChanged(event: any){
    if(this.pageNumber != event.page){
      this.pageNumber = event.page;
    }
  }

}
