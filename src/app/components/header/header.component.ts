import { Component, OnInit, HostListener } from '@angular/core';

import { DataManagerService } from '@app/datamanager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  shrinkNav = false;
  constructor(
    private dataManager: DataManagerService,
  ) { }

  ngOnInit() { }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    if (window.pageYOffset > 33) {
      this.shrinkNav = true;
    } else {
      this.shrinkNav = false;
    }
  }

  setCategory(category?) {
    this.dataManager.setCurrentCategory(category);
  }

}
