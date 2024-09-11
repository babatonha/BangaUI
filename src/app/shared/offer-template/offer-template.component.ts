import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-offer-template',
  templateUrl: './offer-template.component.html',
  styleUrls: ['./offer-template.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    MatButtonModule
  ]
})
export class OfferTemplateComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  constructor() { }

  ngOnInit() {
  }


  generatePDF() {
    const element = document.getElementById('contentToConvert');
    if (!element) {
      console.error('Element not found');
      return;
    }

    html2canvas(element, { useCORS: true }).then((canvas) => {
      console.log('Canvas:', canvas);
      
      const imgData = canvas.toDataURL('image/png');
      console.log('Image Data:', imgData);      
      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 size
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('converted-document.pdf');
    }).catch(error => {
      console.error('Error converting to PDF:', error);
    });
}
}




