import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataManagerService } from '@app/datamanager.service';
import { getSrc } from '@app/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // @Input() projects;
  projects = [];
  categories = [];
  currentCategory;
  categorySubscription;
  projectsSubscription;
  getSrc = getSrc;

  constructor(
    private dataManager: DataManagerService
  ) {
    // this.projects = dataManager.getProjects();
    // this.categories = dataManager.getCategories();
  }

  ngOnInit() {
    // this.currentCategory = this.dataManager.currentCategory;
    this.categorySubscription = this.dataManager.currentCategory$.subscribe(data => {
      this.currentCategory = data;
    });
    this.projectsSubscription = this.dataManager.projects$.subscribe(data => {
      this.projects = data;
    });
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
    this.projectsSubscription.unsubscribe();
  }
}
