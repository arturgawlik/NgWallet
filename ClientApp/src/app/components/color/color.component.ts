import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-color',
  template:
  `<div style="height: 20px; width: 20px; border-radius: 100%" [style.background-color]="bgColor"></div>`
})
export class ColorComponent implements OnInit {

  @Input() bgColor: string = null;

  constructor() { }

  ngOnInit() {
  }

}
