import { Component, OnInit } from '@angular/core';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { BaseService } from '../../_services/base.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';
import { take } from 'rxjs';
import { PropertyPhotoService } from '../../_services/propertyPhoto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
  standalone: true,
  imports:[
    CommonModule, 
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    FileUploadModule]
})
export class PhotoEditorComponent implements OnInit {
  uploader:FileUploader | undefined;
  hasBaseDropZoneOver:boolean | undefined;
  hasAnotherDropZoneOver:boolean | undefined;
  response:string | undefined;
  dataSource: any | undefined;
  user: User | undefined;
  propertyId: number | undefined;

  displayedColumns: string[] = ['name','actions'];
 
  constructor (private baseService: BaseService,
     private accountService: AccountService, 
     private propertyPhotoService: PropertyPhotoService,
     private spinnerService: NgxSpinnerService,
     private toastr: ToastrService){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          this.user = user;
        }
      }
    });

    this.initializeFileUploader();
    
  }

  ngOnInit(): void {
    
  }
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  initializeFileUploader(){
    this.uploader = new FileUploader({
      url: this.baseService.baseUrl + `PropertyPhoto/Upload/${1}`,
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 2024  *1024,

    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    //this.uploader.onSuccessItem(item, response,status,headers) =>
 
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
 
    this.response = '';
 
    this.uploader.response.subscribe( res => this.response = res );
  }

  uploadAllPhotos(){
    this.propertyId = 1;
    if(this.uploader?.queue && this.propertyId){
      this.spinnerService.show();
      const files = this.uploader?.queue.map(file => file._file);
      const formData = new FormData();

      for (const file of files) {  
        formData.append('files', file);
      }
    
      this.propertyPhotoService.saveAll(formData, this. propertyId ).subscribe({
        next: response =>{
          this.spinnerService.hide();
          this.toastr.success("Photos Uploaded successfully!");
        }
      });
    }
  }

}
