import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Wallet } from 'src/app/models/wallet';
import { ApplicationHttpClient } from 'src/app/services/http/applicationHttpClientService.service';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-wallet-definition',
  templateUrl: './wallet-definition.component.html',
  styleUrls: ['./wallet-definition.component.css']
})
export class WalletDefinitionComponent {

  @Input() wallet: Wallet;
  @Output() walletSaved = new EventEmitter<any>();

  alerts: any[] = [];
  
  walletForm: FormGroup;

  get name() {
    return this.walletForm.get('Name');
  }

  constructor(private fb: FormBuilder, private httpClient: ApplicationHttpClient){
    this.init();
    this.walletForm.valueChanges.subscribe(() => {
    });
  }

  init() {
    if (!this.wallet) {
      this.wallet = new Wallet();
      this.wallet.fastAccess = true;
    }

    this.walletForm = this.fb.group({
      Id: [this.wallet.id],
      Name: [this.wallet.name, [Validators.required], [this.walletNameOccupied.bind(this)]],
      Description: [this.wallet.description],
      FastAccess: [this.wallet.fastAccess]
    });
  }

  formSubmit() {
    if (this.walletForm.valid) {
      this.httpClient.post('/wallet/save', this.walletForm.value).subscribe(
        response => {
          this.walletSaved.emit(null);
          this.init();
          this.alerts.push({
            type: 'success',
            msg: 'Your wallet was successful saved!',
            timeout: 5000
          });
        }
      )
    } else {
      this.name.markAsTouched();
    }
  }

  // validators
  walletNameOccupied(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    return this.httpClient.get(`/wallet/isNameOccupied?name=${ctrl.value}`).pipe(
        map(isOccupied => (isOccupied ? { nameOccupied: true } : null)),
        catchError(() => null)
    );
}
}
