import {Component, Input, AfterContentInit, ContentChildren, QueryList, Directive} from '@angular/core';

// Directiva para marcar cada slide
@Directive({
  selector: '[carouselSlide]'
})
export class CarouselSlideDirective {}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterContentInit {
  @Input() showNavButtons: boolean = true;
  @Input() enableNavButtons: boolean = true;
  @Input() showIndicators: boolean = true;
  @Input() enableIndicators: boolean = true;
  @Input() autoplay: boolean = false;
  @Input() autoplayInterval: number = 3000;

  @ContentChildren(CarouselSlideDirective) slides!: QueryList<CarouselSlideDirective>;

  currentIndex: number = 0;
  totalSlides: number = 0;
  slidesArray: number[] = [];
  private autoplayTimer: any;

  ngAfterContentInit() {
    this.totalSlides = this.slides.length;
    this.slidesArray = Array(this.totalSlides).fill(0).map((_, i) => i);

    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.totalSlides - 1;
    }
    this.resetAutoplay();
  }

  nextSlide() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.resetAutoplay();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.resetAutoplay();
  }

  private startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      this.nextSlide();
    }, this.autoplayInterval);
  }

  private resetAutoplay() {
    if (this.autoplay) {
      clearInterval(this.autoplayTimer);
      this.startAutoplay();
    }
  }

  ngOnDestroy() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }
}
