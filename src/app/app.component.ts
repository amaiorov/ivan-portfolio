import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { DataManagerService } from '@app/datamanager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentPage;

  constructor(
    private dataManager: DataManagerService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        // console.log('~~~ActivationEnd');
        if (this.currentPage === 'project' || this.currentPage !== event.snapshot.data.page) {
          // console.log(event.snapshot.data.page);
          // console.log(event.snapshot.params.category);
          // console.log(this.currentPage)
          // window.scrollTo(0, 0);
        }
        this.currentPage = event.snapshot.data.page;
        // this.title.setTitle(this.generateTitle(this.currentPage));
        this.generateTitle(this.currentPage);
      } else if (event instanceof NavigationEnd) {
        // debugger;
      }
    });
  }

  public getTitle() {
    return this.title.getTitle();
  }

  public generateTitle(page) {
    // let newTitle;
    switch(page) {
      case 'project':
        // this.title.setTitle(`Project - ${this.dataManager.mainTitle}`);
        break;
      case '404':
        this.title.setTitle(`Not found - ${this.dataManager.mainTitle}`);
        break;
      default:
        const newTitle = page.replace(/^\w/, (chr) => chr.toUpperCase());
        this.title.setTitle(`${newTitle} - ${this.dataManager.mainTitle}`);
    }
    // newTitle = newTitle + ' - ' + this.mainTitle;
    // return newTitle;
  }

  @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (event.key === 'd') {
        document.body.classList.toggle('debug');
        document.querySelectorAll('picture').forEach((item) => {
          item.dataset.currentSrc = item.querySelector('img').currentSrc.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
        });
      }
    }

}
