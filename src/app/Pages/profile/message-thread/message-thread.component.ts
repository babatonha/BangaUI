import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { Message } from '../../../_models/message';
import { MessageService } from '../../../_services/message.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { PresenceService } from '../../../_services/presence.service';

@Component({
  selector: 'app-message-thread',
  templateUrl: './message-thread.component.html',
  styleUrls: ['./message-thread.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    TextInputComponent,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    NgxSpinnerModule,
    ConfirmDialogComponent
  ]
})
export class MessageThreadComponent implements OnInit {

  @Input() messages: Message[] = [];
  @Input() username?: string;
  myForm!: FormGroup;
  messageContent:string | undefined;

  constructor(private messageService: MessageService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public presenceService: PresenceService,
    private route: ActivatedRoute, ) { }

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      this.username = params['id'];
      this.getMessageThread();
    });
    
    this.generateForm();
  }


  deleteMessage(messageId: number){
    this.messageService.deleteMessage(messageId).subscribe({
      next: () =>{
        this.messages.splice(this.messages.findIndex(m => m.id === messageId), 1);
      }
    })
  }

  openDeleteDialog(id: number) { 
   const dialogRef =  this.dialog.open(ConfirmDialogComponent, 
      {
        data: {
          title : "Delete Message",
          content: "Are you sure you want to delete this message?"
        }
      });

      dialogRef.componentInstance.onConfirm.subscribe(() => {
        this.spinner.show();
        this.messageService.deleteMessage(id).subscribe({
          next: () =>{
            this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
            dialogRef.close(true);
            this.spinner.hide();
            this.toastr.success("Succesfully deleted")
          }
        })
      });
  }

  generateForm(){
    this.myForm = this.fb.group({
      message : [],   
    });
  }

  sendMessage(){
    this.spinner.show();
    this.messageContent = this.myForm.value.message;
    if(this.username && this.messageContent){
      this.messageService.sendMessage(this.username, this.messageContent).subscribe({
        next: response => {
          this.getMessageThread();
           this.toastr.success("Message sent");
           this.generateForm();
           this.spinner.hide();
        }
      })
    }else{
        this.toastr.info("Please enter message");
    }
  }

  getMessageThread(){
    if(this.username){
      this.messageService.getMessageThread(this.username).subscribe({
        next: response => {
          this.messages = response;
        }
      })
    }
  }


}
