import { Component, OnInit } from '@angular/core';
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-email-support',
  templateUrl: './email-support.page.html',
  styleUrls: ['./email-support.page.scss'],
})
export class EmailSupportPage implements OnInit {
 subject: string = '';
  email: string = '';
  message: string = '';

  constructor() { }

  ngOnInit() {
  }
sendEmail(){
  var templateParams = {
    subject: this.subject,
    message:this.message
};
  emailjs.sendForm('serviceID', 'templateID', 'templateParams', 'publicKey')
  .then(function(response) {
     console.log('SUCCESS!', response.status, response.text);
  }, function(error) {
     console.log('FAILED...', error);
  });
}


}
