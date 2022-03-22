import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';

  @Input() message?: string;

  @Output() handlerSubmitEvent = new EventEmitter<boolean>();

  public cancelButtonText: string = 'Cancel';
  public okButtonText: string = 'Ok';
  public close: IconDefinition = faTimes;

  public constructor() {}

  public handlerSubmit(val: boolean): void {
    this.handlerSubmitEvent.emit(val);
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public ngOnInit(): void {}
}
