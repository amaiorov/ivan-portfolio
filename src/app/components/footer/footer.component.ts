import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  year = new Date().getFullYear();
  email = 'i.v.maiorov@gmail.com';

  constructor() { }

  ngOnInit() {
    
  }

}
