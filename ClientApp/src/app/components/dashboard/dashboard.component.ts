import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from 'src/app/services/wallet/models/wallet.model';
import { map } from 'rxjs/operators';
import { WalletChange } from 'src/app/services/wallet/models/walletChange.model';
import { WalletService } from 'src/app/services/wallet/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
