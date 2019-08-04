import { NgModule } from '@angular/core';
import { AddIsValidIsInvalidClassDirective } from './add-is-valid-is-invalid-class.directive';
import { AddCardRandomColorDirective } from './add-card-random-color.directive';
import { GradientDirective } from './gradient.directive';
import { AddDefaultNotSelectedDirective } from './add-default-not-selected.directive';
import { CommonModule } from '@angular/common';
import { ValidationMessagesDirective } from './validation-massages.directive';
import { AbsolutePipe } from '../pipes/absolute.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AddIsValidIsInvalidClassDirective,
        AddCardRandomColorDirective,
        GradientDirective,
        AddDefaultNotSelectedDirective,
        ValidationMessagesDirective,
        AbsolutePipe
    ],
    exports: [
        AddIsValidIsInvalidClassDirective,
        AddCardRandomColorDirective,
        GradientDirective,
        AddDefaultNotSelectedDirective,
        ValidationMessagesDirective,
        AbsolutePipe
    ]
})
export class SharedModule {
}
