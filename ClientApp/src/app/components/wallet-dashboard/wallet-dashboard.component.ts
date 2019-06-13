import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Wallet } from 'src/app/services/wallet/models/wallet.model';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { map } from 'rxjs/operators';
import { WalletChange } from 'src/app/services/wallet/models/walletChange.model';
import { WalletChartResult } from 'src/app/services/wallet/models/walletChartResult.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.css']
})
export class WalletDashboardComponent implements OnInit {

  @Input() walletId: number;

  private wallet$: Observable<Wallet>
  private walletChartResult$: Observable<WalletChartResult>;
  form: FormGroup;

  constructor(private walletService: WalletService, private fb: FormBuilder) {
    this.wallet$ = this.walletService.getWallet(this.walletId);
    this.walletChartResult$ = this.walletService.getWalletChart(this.walletId);
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.form = this.fb.group({
      operationType: ['outcome'],
      currency: ['PLN'],
      value: ['']
    })
  }

  //#region template getters
  get walletName$(): Observable<string> {
    return this.wallet$.pipe(
      map(w => w.name)
    );
  }

  get walletCurrentState$(): Observable<number> {
    return this.wallet$.pipe(
      map(w => w.currentState)
    );
  }

  get walletCurrency$(): Observable<string> {
    return this.wallet$.pipe(
      map(w => w.currency)
    );
  }

  get walletChanges$(): Observable<WalletChange[]> {
    return this.wallet$.pipe(
      map(w => w.walletChanges)
    );
  }

  get walletChartData$(): Observable<any> {
    return this.walletChartResult$.pipe(
      map(r => r.data)
    );
  }

  get walletChartOptions$(): Observable<any> {
    return this.walletChartResult$.pipe(
      map(r => r.options)
    );
  }
  //#endregion

}
