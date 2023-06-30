import { Component, OnInit } from '@angular/core';
//import { File } from '@ionic-native/file/ngx';
//import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@Component({
  selector: 'app-test-this',
  templateUrl: './test-this.page.html',
  styleUrls: ['./test-this.page.scss'],
})
export class TestTHisPage implements OnInit {

  name:any;
  surname: any;
  phoneNumber: any;
  gender: any;
  age: any;



  constructor(private fileOpener: FileOpener/*private file: File, private fileOpener: FileOpener*/) { }

  ngOnInit() {
  }
  submitForm() {
    // Create the PDF content
    const pdfContent = `
      <h1>Personal Information</h1>
      <p><strong>Name:</strong> ${this.name}</p>
      <p><strong>Surname:</strong> ${this.surname}</p>
      <p><strong>Phone Number:</strong> ${this.phoneNumber}</p>
      <p><strong>Gender:</strong> ${this.gender}</p>
      <p><strong>Age:</strong> ${this.age}</p>
    `;

    // Create the PDF file
    const fileName = `${this.name}_${this.surname}.pdf`;
   // const directory = this.file.externalRootDirectory + '/Download/';
   // this.file.writeFile(directory, fileName, pdfContent, { replace: true }).then(() => {
      // Open the PDF file
    //  this.fileOpener.open(`${directory}/${fileName}`, 'application/pdf');
    };
  
/*

    this.fileOpener.open('path/to/file.pdf', 'application/pdf')
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error opening file', e));
  
  this.fileOpener.showOpenWithDialog('path/to/file.pdf', 'application/pdf')
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error opening file', e));





import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator';

constructor(private pdfGenerator: PDFGenerator) { }

...

this.pdfGenerator.fromURL(url, options).then(base64String => console.log(base64String));








import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


*/


}
