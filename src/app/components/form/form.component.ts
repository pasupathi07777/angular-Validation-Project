// import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';


// @Component({
//   selector: 'app-form',
//   templateUrl: './form.component.html',
//   styleUrls: ['./form.component.css']
// })
// export class FormComponent implements OnInit {

//   constructor() { }

//   @Output() submit = new EventEmitter<void>();
//  @Input("for") for:string=""
//   onSubmit() {
//     this.submit.emit();
    
//   }


//   ngOnInit(): void {
//   }

// }
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() for: string = '';
  @Output() submit = new EventEmitter<void>();

  onSubmit() {
    this.submit.emit();
  }
}