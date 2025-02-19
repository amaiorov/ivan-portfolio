import { Component, OnInit, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { DataManagerService } from '@app/datamanager.service';
import { getSrc } from '@app/util';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @ViewChild('fullscreenGallery') fullscreenGallery: ElementRef;

  projects;
  currentProject;
  relatedProjects;
  getSrc = getSrc;
  images;
  isGalleryVisible = false;
  currentImage
  totalImages

  constructor(
    private dataManager: DataManagerService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private changeDetector: ChangeDetectorRef
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.projects = this.dataManager.getProjects();
    this.currentProject = this.getProjectById(this.route.snapshot.params['id']);
    this.title.setTitle(`${this.currentProject.shortTitle} - Projects - ${this.dataManager.mainTitle}`);
    if (!this.currentProject) {
      this.router.navigate(['not-found'], {replaceUrl: true});
      return;
    }
    this.relatedProjects = this.currentProject.related.map(item => {
      let project = this.getProjectById(item);
      if (!project) {
        console.error(`project "${item}" not found`);
      }
      return project || false;
    });

    this.images = this.currentProject.blocks
      .filter(item => item.images)
      .map(item => item.images)
      .flat()
      .filter(item => !item.video)
      .map(item => item.url);
    this.totalImages = this.images.length;
  }

  showGallery($event) {
    this.isGalleryVisible = true;
    this.changeDetector.detectChanges();

    for (let i = 0; i < this.fullscreenGallery.nativeElement.children.length; i++) {
      const el = this.fullscreenGallery.nativeElement.children[i];
      if (el.dataset.src === $event.currentTarget.dataset.src) {
        el.classList.add('current');
        this.currentImage = i + 1;
        break;
      }
    }

    document.body.classList.add('no-scroll');
  }

  getProjectById(id) {
    return this.projects.find((item) => {
      return item.id === id;
    });
  }

  hideGallery() {
    this.isGalleryVisible = false;
    document.body.classList.remove('no-scroll');
  }

  rotateImage($event) {
    $event.stopPropagation();

    if ($event.clientX <= document.body.offsetWidth / 2 && this.currentImage > 1) {
      this.previousImage($event.currentTarget);
    } else if ($event.clientX > document.body.offsetWidth / 2 && this.currentImage < this.totalImages) {
      this.nextImage($event.currentTarget);
    }
  }
  previousImage(el) {
    this.currentImage--;
    this.fullscreenGallery.nativeElement.querySelector('.current').classList.remove('current');
    el.previousSibling.classList.add('current');
    this.fullscreenGallery.nativeElement.classList.remove('first', 'last');
    if (this.currentImage === 1) {
      this.fullscreenGallery.nativeElement.classList.add('first');
    }
  }

  nextImage(el) {
    this.currentImage++;
    this.fullscreenGallery.nativeElement.querySelector('.current').classList.remove('current');
    el.nextSibling.classList.add('current');
    this.fullscreenGallery.nativeElement.classList.remove('first', 'last');
    if (this.currentImage === this.totalImages) {
      this.fullscreenGallery.nativeElement.classList.add('last');
    }
  }

  onLoad() {
    alert('on load')
  }

  onError() {
    alert('on error')
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isGalleryVisible) {
      this.hideGallery();
    }
  }
}
