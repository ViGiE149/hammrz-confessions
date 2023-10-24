import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-line',
  templateUrl: './help-line.page.html',
  styleUrls: ['./help-line.page.scss'],
})
export class HelpLinePage implements OnInit {

  constructor() {}

  ngOnInit() {
  }
  callNumber(phoneNumber: string) {
    const telUrl = `tel:${phoneNumber}`;
    window.open(`tel:${phoneNumber}`, '_system');
  }

}
