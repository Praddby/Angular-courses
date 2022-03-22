import { Component, Input, OnInit } from '@angular/core';
import { faTransgender, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() nameButton: string = '';

  @Input() icon: IconDefinition = faTransgender;

  @Input() isIcon: boolean = false;

  public constructor() {}

  public ngOnInit(): void {}
}
