import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Wallet } from 'src/app/services/wallet/models/wallet.model';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { map } from 'rxjs/operators';
import { WalletChange } from 'src/app/services/wallet/models/walletChange.model';
import { WalletChartResult } from 'src/app/services/wallet/models/walletChartResult.model';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { positiveNumberValidator } from 'src/app/validators/custom-validators';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.css'],
})
export class WalletDashboardComponent implements OnInit {

  @Input() walletId: number;

  private wallet$: Wallet
  private walletChartResult$: WalletChartResult;
  form: FormGroup;
  isChangeSaving = false;

  constructor(private walletService: WalletService, private fb: FormBuilder, private messageService: MessageService) {
  }

  ngOnInit() {
    this.fetchData();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      operationType: ['outcome'],
      value: ['', [Validators.required, positiveNumberValidator]],
      description: [''],
      walletId: [this.walletId]
    });
  }

  fetchData() {
    this.walletService.getWallet(this.walletId).subscribe(x => this.wallet$ = x);
    this.walletService.getWalletChart(this.walletId).subscribe(x => {console.log(x); this.walletChartResult$ = x;});
  }

  saveChange() {
    if (this.form.valid) {
      console.log(JSON.stringify(this.form.value));
      this.isChangeSaving = true;
      this.walletService.saveChange(this.form.value).subscribe(
        s => {
          this.initForm();
          this.fetchData();
          this.messageService.success(null, 'Wallet change is saved!');
          this.isChangeSaving = false;
        },
        err => {
          this.messageService.error(null, 'Wallet change save errror...');
          console.log(JSON.stringify(err));
          this.isChangeSaving = false;
        }
      )
    } else {
      this.formValue.markAsDirty();
    }
  }

  //#region template getters
  get walletName$(): string {
    // return this.wallet$.pipe(
    //   map(w => w.name)
    // );
    if (this.wallet$)
      return this.wallet$.name;
    else return null;
  }

  get walletCurrentState$(): number {
    // return this.wallet$.pipe(
    //   map(w => w.currentState)
    // );
    if (this.wallet$)
      return this.wallet$.currentState;
    else
      return null;
  }

  get walletCurrency$(): string {
    // return this.wallet$.pipe(
    //   map(w => w.currency)
    // );
    if (this.wallet$)
      return this.wallet$.currency;
    else
      return null;
  }

  get walletChanges$(): WalletChange[] {
    // return this.wallet$.pipe(
    //   map(w => w.walletChanges)
    // );
    if (this.wallet$)
      return this.wallet$.walletChanges;
    else
      return null;
  }

  get walletChartData$(): Observable<any> {
    // return this.walletChartResult$.pipe(
    //   map(r => r.data)
    // );
    if (this.walletChartResult$)
      return this.walletChartResult$.data;
    else
      return null;
  }

  get walletChartOptions$(): Observable<any> {
    // return this.walletChartResult$.pipe(
    //   map(r => r.options)
    // );
    if (this.walletChartResult$)
      return this.walletChartResult$.options;
    else
      return null;
  }

  //form getters
  get formValue(): AbstractControl {
    return this.form.get('value');
  }

  //#endregion

}
