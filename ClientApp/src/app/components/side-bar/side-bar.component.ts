import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  sideBarOptions = [
    { name: 'Dashboard', icon: 'home', routerLink: '/home' },
    { name: 'Wallets', icon: 'file', routerLink: '/wallets' },
    { name: 'Products', icon: 'shopping-cart', routerLink: '/products' },
    { name: 'Customers', icon: 'users', routerLink: '/customers' },
    { name: 'Reports', icon: 'bar-chart-2', routerLink: '/reports' },
    { name: 'Integrations', icon: 'layers', routerLink: '/integrations' }
  ];

  sideBarWallets = [
    { name: 'Food', icon: 'credit-card' },
    { name: 'Travels', icon: 'credit-card' },
    { name: 'Bitches', icon: 'credit-card' },
  ];

  constructor() {
  }

  ngOnInit() {
  }

  addWallet() {
    console.log('add wallet');
  }

}
