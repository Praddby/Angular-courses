import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[appEmailValidatior]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatiorDirective, multi: true }],
})
export class EmailValidatiorDirective implements Validator {
  constructor() {}

  public validate(control: AbstractControl): ValidationErrors | null {
    return emailValidatior()(control);
  }
}

export function emailValidatior(): ValidatorFn {
  const regexp: RegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const isValidEmail = regexp.test(control.value);

    return !isValidEmail ? { incorrectEmail: true } : null;
  };
}
