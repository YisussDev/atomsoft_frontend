import {AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector: '[appTypography]',
})
export class TypographyDirective implements OnInit, AfterViewInit {

  public classMap = {
    title: 'text-2xl font-semibold text-btw',
    subtitle: 'text-xl font-medium text-btw',
    medium: 'text-lg font-medium text-btw',
    semi_medium: 'text-sm font-medium text-btw',
    paragraph: 'text-sm font-light text-btw',
  };

  @Input('appTypography') type!: 'title' | 'subtitle' | 'paragraph' | "medium" | "semi_medium";

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const classes = this.classMap[this.type];
    classes.split(' ').forEach((cls) => {
      this.renderer.addClass(this.el.nativeElement, cls);
    });
  }
}
