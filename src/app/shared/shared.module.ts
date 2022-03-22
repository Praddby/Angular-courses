import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
} from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DurationToHoursPipe } from '../pipes/duration';
import { CreationDatePipe } from '../pipes/creationDate';
import { StringJoinerPipe } from '../pipes/stringJoiner';
import { TogglePasswordDirective } from '../directives/togglePassword';
import { EmailValidatiorDirective } from '../directives/emailValidator';

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  DurationToHoursPipe,
  CreationDatePipe,
  StringJoinerPipe,
  TogglePasswordDirective,
  EmailValidatiorDirective,
  ModalComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, FontAwesomeModule],
  exports: [CommonModule, FontAwesomeModule, ...components],
})
export class SharedModule {}
