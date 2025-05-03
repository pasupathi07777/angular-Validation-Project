import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor() { }


  @Input() label:string=""
  @Input() disabled:boolean=false
  @Input() type:string="button"
  @Input() width:number=100
  @Input() bgColor:string=""
  @Input() isLoading:boolean=false

  @Output()  clickButtom=new EventEmitter<void>()

  ngOnInit(): void {

  }

}
