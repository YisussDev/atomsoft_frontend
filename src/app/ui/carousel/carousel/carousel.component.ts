import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnChanges, OnDestroy {
  @Input() items: any[] = [];
  @Input() autoPlayInterval: number = 5000;
  @Input() showNavButtons: boolean = true;
  @Input() showIndicators: boolean = true;

  currentIndex: number = 0;
  autoPlay: boolean = false;
  enableNavButtons: boolean = true;
  enableIndicators: boolean = true;
  private intervalId: any;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes["items"].currentValue) {
        this.items = changes["items"].currentValue;
      }
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextSlide() {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.items.length - 1;
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  toggleAutoPlay() {
    if (this.autoPlay) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  private startAutoPlay() {
    this.stopAutoPlay();
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  private stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  onControlChange() {
    // Puedes agregar lógica adicional aquí si es necesario
  }
}
