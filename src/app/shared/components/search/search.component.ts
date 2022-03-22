import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() public placeholder: string;

  @Output() public clickBtnSearch = new EventEmitter<string>();

  @ViewChild('search') message: ElementRef;

  public constructor() {}

  public ngOnInit(): void {}

  public submit(): void {
    this.clickBtnSearch.emit(this.message.nativeElement.value);
  }

  public onInput(): void {
    if (!this.message.nativeElement.value) {
      this.clickBtnSearch.emit(this.message.nativeElement.value);
    }
  }
}
