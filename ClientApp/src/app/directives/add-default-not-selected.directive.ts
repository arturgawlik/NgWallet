import { Directive, ElementRef, OnInit, Renderer2, DoCheck, AfterViewChecked } from '@angular/core';

@Directive({
    selector: '[appAddDefaultIfNotSelected]'
})
export class AddDefaultNotSelectedDirective implements DoCheck {

    constructor(private elem: ElementRef<HTMLSelectElement>, private renderer: Renderer2) {
    }

    ngDoCheck() {
        this.check2();
    }

    private check() {
        if (
                this.elem.nativeElement.selectedOptions.length
                && this.elem.nativeElement.selectedOptions.item(0).text !== 'Choose option'
                && this.elem.nativeElement.options.item(0).text === 'Choose option'
            ) {
            this.elem.nativeElement.options.remove(0);
        } else {
            const temp = this.elem.nativeElement.options.item(0);
            if (!temp || temp.text !== 'Choose option') {
                const option = this.renderer.createElement('option') as HTMLOptionElement;
                option.text = 'Choose option';
                option.value = 'null';
                option.selected = true;
                this.elem.nativeElement.options.add(option, 0);
            }
        }
    }

    private check2() {
        if (this.elem.nativeElement.selectedIndex === -1) {
            const option = this.renderer.createElement('option') as HTMLOptionElement;
            option.text = ' -- choose option --';
            option.id = 'default-choose-option';
            option.value = 'null';
            option.selected = true;
            this.elem.nativeElement.options.add(option, 0);
        } else if (
                !this.elem.nativeElement.selectedOptions.namedItem('default-choose-option')
                && this.elem.nativeElement.options.namedItem('default-choose-option')
            ) {
            const tmp = this.elem.nativeElement.options.namedItem('default-choose-option');
            tmp.remove();
        }
    }

}
