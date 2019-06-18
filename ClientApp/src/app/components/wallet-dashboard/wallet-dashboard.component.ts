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

  private wallet$: Observable<Wallet>
  private walletChartResult$: Observable<WalletChartResult>;
  form: FormGroup;

  constructor(private walletService: WalletService, private fb: FormBuilder, private messageService: MessageService) {
    this.wallet$ = this.walletService.getWallet(this.walletId);
    this.walletChartResult$ = this.walletService.getWalletChart(this.walletId);
    
  }

  ngOnInit() {
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

  saveChange() {
    if (this.form.valid) {
      console.log(JSON.stringify(this.form.value));
      this.walletService.saveChange(this.form.value).subscribe(
        s => {
          this.initForm();
          this.messageService.success(null, 'Wallet change is saved!');
        },
        err => {
          this.messageService.error(null, 'Wallet change save errror...');
          console.log(JSON.stringify(err));
        }
      )
    } else {
      this.formValue.markAsDirty();
    }
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

  //form getters
  get formValue(): AbstractControl {
    return this.form.get('value');
  }

  //#endregion

}
