// import { Component, Input, Output, EventEmitter } from '@angular/core';

// @Component({
//   selector: 'app-input',
//   templateUrl: './input.component.html',
//   styleUrls: ['./input.component.css']
// })
// export class InputComponent {
//   @Input() for: string = '';
//   @Input() label: string = '';
//   @Input() placeholder: string = '';
//   @Input() type: string = 'text';
//   @Input() model: string = '';

//   @Output() modelChange = new EventEmitter<string>();
// }
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() for: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
}