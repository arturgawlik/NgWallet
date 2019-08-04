import { Directive, Input, OnInit, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAddCardRandomColor]'
})
export class AddCardRandomColorDirective implements OnInit {

  static cardColorClasses = [
    ['bg-primary', 'text-white'],
    ['text-white', 'bg-secondary'],
    ['text-white', 'bg-success'],
    ['text-white', 'bg-danger'],
    ['text-white', 'bg-warning'],
    ['text-white', 'bg-info'],
    ['bg-light'],
    ['text-white', 'bg-dark']
  ];

  @Input('appAddCardRandomColor')
  shouldRandom: boolean;

  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (this.shouldRandom) {
      const classesNames = AddCardRandomColorDirective
                        .cardColorClasses
                        [Math.floor(Math.random() *  (AddCardRandomColorDirective.cardColorClasses.length - 1))];
      classesNames.forEach(className => {
        this.renderer.addClass(this.elem.nativeElement, className);
      });
    }
  }
}
