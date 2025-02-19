import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  // @Input() currentCategory;
  @ViewChild('menu') menu: ElementRef;

  isMenuOpen = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.isMenuOpen = false;
        document.body.classList.remove('no-scroll');
      }
    });
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  toggleMenu() {
    if (!this.isMenuOpen) {
      // open menu
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      this.isMenuOpen = true;
      document.body.classList.add('no-scroll');
    } else {
      // close menu
      this.isMenuOpen = false;
      document.body.classList.remove('no-scroll');
    }
    // this.menu.nativeElement.classList.toggle('animate').toggle('animate');
  }

}
