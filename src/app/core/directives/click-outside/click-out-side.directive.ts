import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutSide]'
})
export class ClickOutSideDirective implements OnDestroy {

  @Output() clickOutside: EventEmitter<void> = new EventEmitter<void>();
  @Output() overflowDetected: EventEmitter<number> = new EventEmitter<number>();
  @Input() widthBox: number = 300;
  @Input() widthContainer: number = 50;

  private element: HTMLElement | null;

  constructor(private elementRef: ElementRef) {
    this.element = this.elementRef?.nativeElement || null;
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
    if (!this.element) return;

    const clickedInside = this.element.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }

  @HostListener('click', ['$event'])
  public onClickInstance(event: MouseEvent) {
    if (!this.element) return;
    this.calculateIfOverflow();
  }

  public calculateIfOverflow(): void {
    if (!this.element) return;

    const widthScreen: number = window.innerWidth;
    const leftButton: number = this.element.getBoundingClientRect().left;
    const rightButton: number = widthScreen - (leftButton + this.widthContainer);
    const totalRightBox: number = rightButton + this.widthBox;

    if (totalRightBox > widthScreen) {
      this.overflowDetected.emit(Math.trunc(totalRightBox - widthScreen) + 1);
    } else {
      this.overflowDetected.emit(0);
    }
  }

  ngOnDestroy() {
    this.element = null; // Limpiar referencia para evitar acceso a un objeto destruido
  }
}
