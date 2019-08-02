import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  progressRef: NgProgressRef;

  constructor(private routerService: Router, private titleService: Title, private progress: NgProgress ) {
  }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('progress');

    this.routerService.events.subscribe(
      (e) => {
        if (e instanceof NavigationStart) {
          this.progressRef.start();
          console.log('navigation starts');
        } else if (e instanceof NavigationEnd) {
          this.progressRef.complete();
          switch (this.routerService.url) {
            case '/login':
              this.setupTitle('login');
              break;
            case '/home':
              this.setupTitle('home');
              break;
            case '/wallets':
              this.setupTitle('wallets');
              break;
            case '/settings/categories-definition':
              this.setupTitle('settings')
              break;
            case '/settings/wallets-definition':
              this.setupTitle('settings')
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
