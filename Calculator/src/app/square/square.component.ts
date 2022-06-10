import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input() value:any;
  @Output() getClickedButton = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  sendValueToParent(value:any){
    this.getClickedButton.emit(value);
  }

}
