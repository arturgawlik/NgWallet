import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  sideBarVisible = false;

  constructor(private renderer: Renderer2, private authService: AuthService) {
  }

  ngOnInit() {
    // document.getElementsByTagName('body')[0].style.backgroundImage = null;
    this.renderer.removeStyle(document.body, 'backgroundImage');
    this.renderer.addClass(document.body, 'bootstrap');
  }

  logout() {
    this.authService.doLogout();
  }

}
