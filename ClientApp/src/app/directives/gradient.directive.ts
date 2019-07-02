import { Directive, Input, ElementRef, OnInit, OnChanges } from "@angular/core";

@Directive({
    selector: '[gradient]'
})
export class GradientDirective implements OnInit, OnChanges {

    @Input('gradient') color: string;

    constructor(private elementRef: ElementRef<HTMLElement>) {
    }

    ngOnInit() {
        this.set();
    }

    ngOnChanges() {
        this.set();
    }

    private set() {
        if (this.color) {
            this.elementRef.nativeElement.style.backgroundImage = `linear-gradient(to right, ${this.color} 6px, #eaeaea 6px)`;
        } else {
            this.elementRef.nativeElement.style.backgroundImage = null;
        }
    }

}