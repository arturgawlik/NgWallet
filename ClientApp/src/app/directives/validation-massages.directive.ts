import { Directive, ElementRef, Input, OnChanges, Renderer2, OnInit, DoCheck } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Pair } from "../helpers/keyValuePair";

@Directive({
    selector: '[validationMsg]',
})
export class ValidationMessages implements OnInit, DoCheck {

    @Input('validationMsg') fc: AbstractControl;
    @Input('errMsgs') validatorsWithErrMessage: Pair<string, string>[];

    constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.check();
    }

    ngDoCheck() {
        this.check();
    }

    private check() {
        if (this.fc == null)
            return;

        this.reset();

        if (this.fc.invalid && (this.fc.touched || this.fc.dirty)) {
            this.elementRef.nativeElement.classList.add('is-invalid');

            if (this.validatorsWithErrMessage) {
                this.validatorsWithErrMessage.forEach(e => {
                    if (this.fc.errors[e.k]) {
                        const elem = this.createErrElem(e.v);
                        this.elementRef.nativeElement.after(elem);
                    }
                });
            }

        }
    }

    private reset() {
        this.elementRef.nativeElement.classList.remove('is-invalid');
        let elem = this.elementRef.nativeElement.nextSibling;

        while (elem) {
            elem.remove();
            elem = this.elementRef.nativeElement.nextSibling;
        }

    }

    private createErrElem(errMsg: string) {
        const divElem = this.renderer.createElement('div') as HTMLDivElement;
        divElem.classList.add('invalid-feedback');
        divElem.textContent = errMsg;

        return divElem;
    }

}
