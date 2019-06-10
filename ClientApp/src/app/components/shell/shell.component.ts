import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    document.getElementsByTagName('body')[0].style.backgroundImage = null;
    
  }
  
}
