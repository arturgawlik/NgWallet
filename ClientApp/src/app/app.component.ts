import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private routerService: Router, private titleService: Title) {
  }

  ngOnInit(): void {
    this.routerService.events.subscribe(
      (e) => {
        if (e instanceof NavigationEnd) {
          switch (this.routerService.url) {
            case '/login':
              this.setupTitle('login');
              break;
            case '/home':
              this.setupTitle('dashboard');
              break;
            case '/wallets':
              this.setupTitle('wallets');
              break;
            default:
              this.titleService.setTitle('Wallet');
          }
        }
      });
  }

  private setupTitle(subTitile: string) {
    this.titleService.setTitle(`Wallet | ${subTitile}`);
  }

}
