import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';

import { getSrc } from '@app/util';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() slides: any[] = [];

  @ViewChild('gallery') gallery: ElementRef;

  activeSlide: number;
  totalSlides: number;
  isAnimating = false;
  getSrc = getSrc;
  defaultTouch = { x: 0, y: 0, time: 0 };

  constructor() { }

  ngOnInit() {
    this.activeSlide = 0;
    this.totalSlides = this.slides.length;
  }

  // transitionEnded($event) {
  //   console.log('transition ended');
  //   this.isAnimating = false;
  //   // this.gallery.nativeElement.removeEventListener('transitionend', this.transitionEnded);
  //   $event.currentTarget.removeEventListener('transitionend', this.transitionEnded);
  // }

  goto(slide) {
    if (this.isAnimating) {
      console.log('ALREADY ANIMATION')
      return false;
    }
    console.log('goto', slide);
    this.isAnimating = true;
    // this.gallery.nativeElement.addEventListener('transitionend', this.transitionEnded);
    this.activeSlide = slide;
  }

  handleTouch(event) {
    let touch = event.touches[0] || event.changedTouches[0];

    // check the events
    if (event.type === 'touchstart') {
      this.defaultTouch.x = touch.pageX;
      this.defaultTouch.y = touch.pageY;
      this.defaultTouch.time = event.timeStamp;
    } else if (event.type === 'touchend') {
      let deltaX = touch.pageX - this.defaultTouch.x;
      let deltaY = touch.pageY - this.defaultTouch.y;
      let deltaTime = event.timeStamp - this.defaultTouch.time;

      // simulte a swipe -> less than 500 ms and more than 60 px
      if (deltaTime < 500) {
        // touch movement lasted less than 500 ms
        if (Math.abs(deltaX) > 60) {
          // delta x is at least 60 pixels
          if (deltaX > 0) {
            // go to previous slide
            if (this.activeSlide > 0) {
              this.goto(this.activeSlide - 1);
            } else {
              this.gallery.nativeElement.classList.add('bounce-left');
            }
          } else {
            // go to next slide
            if (this.activeSlide < this.totalSlides - 1) {
              this.goto(this.activeSlide + 1);
            } else {
              this.gallery.nativeElement.classList.add('bounce-right');
            }
          }
        }
      }
    }
  }

  @HostListener('click', ['$event']) onClick($event) {
    if ($event.clientX <= this.gallery.nativeElement.offsetWidth / 2) {
      if (this.activeSlide > 0) {
        this.goto(this.activeSlide - 1);
      } else {
        this.gallery.nativeElement.classList.add('bounce-left');
      }
    } else {
      if (this.activeSlide < this.totalSlides - 1) {
        this.goto(this.activeSlide + 1);
      } else {
        this.gallery.nativeElement.classList.add('bounce-right');
      }
    }
  }

  @HostListener('touchstart', ['$event']) onTouchStart($event) {
    this.handleTouch($event);
  }

  @HostListener('touchend', ['$event']) onTouchEnd($event) {
    this.handleTouch($event);
  }

  @HostListener('animationend', ['$event']) onAnimationEnd() {
    this.gallery.nativeElement.classList.remove('bounce-left', 'bounce-right');
  }

  @HostListener('transitionend', ['$event']) onTransitionEnd($event) {
    if ($event.target !== this.gallery.nativeElement) {
      return false;
    } else {
      console.log('transition ended');
      this.isAnimating = false;
    }
  }
}
