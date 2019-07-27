import { Component, OnInit, Renderer2, InjectionToken, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DOCUMENT } from '@angular/common';
import { state, style, transition, trigger, animate } from '@angular/animations';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  animations: [
  trigger('popOverState', [
    state('show', style({
      opacity: 1,
    })),
    state('hide', style({
      opacity: 0,
      height: '0px',
      overflow: 'hidden',
    })),
    transition('show => hide', animate('500ms ease-out')),
    transition('hide => show', animate('500ms ease-in'))
  ]),
  trigger('popOverFastWallets', [
    state('show', style({
      opacity: 1,
    })),
    state('hide', style({
      opacity: 0,
      height: '0px',
      overflow: 'hidden',
    })),
    transition('show => hide', animate('500ms ease-out')),
    transition('hide => show', animate('500ms ease-in'))
  ])]
})
export class ShellComponent implements OnInit {

  sideBarVisible = false;
  firstSubMenuVisable = false;
  fastWalletsSubMenuVisable = false;
  loading = true;

  fastWallets: Wallet[];

  constructor(private renderer: Renderer2, private authService: AuthService, @Inject(DOCUMENT) private document: any, private walletService: WalletService, private subjectService: SubjectService, private router: Router) {
    router.events.subscribe((e: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        // this.loading = false;
      }
    });
    
    this.walletService.fetchAll().subscribe(r => {
      this.fastWallets = r.filter(w => w.fastAccess);
    });
  }

  ngOnInit() {
    // this.renderer.removeStyle(document.body, 'backgroundImage');
    (this.document.body as HTMLElement).style.backgroundImage = null;
  }

  logout() {
    this.authService.doLogout();
  }

  toggle() {
    this.firstSubMenuVisable = !this.firstSubMenuVisable;
  }

  toggleFastWallets() {
    this.fastWalletsSubMenuVisable = !this.fastWalletsSubMenuVisable;
  }

  fastWalletNaviagate(wallet: Wallet) {
    this.router.navigate(['home']);
    this.subjectService.sendMessage(wallet.id);
  }

  get stateName() {
    return this.firstSubMenuVisable ? 'show' : 'hide';
  }

  get fastWalletsStateName() {
    return this.fastWalletsSubMenuVisable ? 'show' : 'hide';
  }

}
