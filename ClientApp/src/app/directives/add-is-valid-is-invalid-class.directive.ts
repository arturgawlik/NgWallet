import { Directive, Renderer2, ElementRef, Input, OnChanges, SimpleChanges, HostListener, ApplicationRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appAddIsValidIsInvalidClass]'
})
export class AddIsValidIsInvalidClassDirective {
  
  _shouldMarkAsInvalid?: boolean = null;
  @Input('appAddIsValidIsInvalidClass') 
  set abstractControl(value: boolean) {
    this._shouldMarkAsInvalid = value;
    this.checkState();
    console.log('shouldMarkAsValid');
    
  }

  constructor(private renderer: Renderer2, private hostElem: ElementRef, private applicationRef: ApplicationRef) {
  }

  private checkState() {
    if (this._shouldMarkAsInvalid) {
      this.renderer.removeClass(this.hostElem.nativeElement, 'is-valid');
      this.renderer.addClass(this.hostElem.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.hostElem.nativeElement, 'is-invalid');
      this.renderer.addClass(this.hostElem.nativeElement, 'is-valid');
    }
  }

}
