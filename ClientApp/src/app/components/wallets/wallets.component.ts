import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationHttpClient } from 'src/app/services/http/applicationHttpClientService.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {

  wallets: Observable<any[]>;

  constructor(private httpClient: ApplicationHttpClient) {
  }

  ngOnInit() {
    this.fetchWallets();
  }

  fetchWallets() {
    this.wallets = this.httpClient.get<any[]>('wallet/getAll');
  }

  walletSaved() {
    console.log('wallet saved');
    this.fetchWallets();
  }

}
