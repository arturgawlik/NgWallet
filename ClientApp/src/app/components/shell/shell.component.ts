import { Component, OnInit, Renderer2, InjectionToken, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  sideBarVisible = false;
  firstSubMenuVisable = false;

  constructor(private renderer: Renderer2, private authService: AuthService, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    // this.renderer.removeStyle(document.body, 'backgroundImage');
    (this.document.body as HTMLElement).style.backgroundImage = null;
  }

  logout() {
    this.authService.doLogout();
  }

}
