import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  exportAs: 'toggle',
})
export class TogglePasswordDirective {
  @HostBinding('type') type: string = 'password';

  @HostBinding('class') class: string = '';

  public constructor() {}

  public toggleType() {
    this.class = this.type === 'password' ? 'show' : '';
    this.type = this.type === 'password' ? 'text' : 'password';
  }
}
