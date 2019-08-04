import { ValidatorFn, FormGroup, ValidationErrors, FormControl } from '@angular/forms';

export const identityPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const signupPassword = control.get('signupPassword');
    const signupPasswordRepeat = control.get('signupPasswordRepeat');

    return signupPassword
        && signupPasswordRepeat
        && signupPassword.value !== signupPasswordRepeat.value
        ? { 'identityPassword': true }
        : null;
};

export const positiveNumberValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    const value = control.value;
    const isErr = !(control.value == null || control.value === '' || control.value > 0);

    return isErr ? {'positiveNumber': true} : null;
};
