import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent {
  @Input()
  control: AbstractControl;

  @Input()
  showErrorsWhen: boolean = true;

  @Input()
  label: string;

  @Input()
  type: 'text' | 'password' | 'email' | 'number' | 'radio' = 'text';

  @Input()
  value = undefined;

  @Input()
  maxLength: number;

  @Input()
  mask: string = '';

  @Input()
  dropSpecialCharacters: boolean = true;

  constructor() {}

  get formControl() {
    return this.control as FormControl;
  }
}
