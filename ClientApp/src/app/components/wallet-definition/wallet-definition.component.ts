import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApplicationHttpClient } from 'src/app/services/http/applicationHttpClientService.service';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { Wallet } from 'src/app/services/wallet/models/wallet.model';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-wallet-definition',
  templateUrl: './wallet-definition.component.html',
  styleUrls: ['./wallet-definition.component.css']
})
export class WalletDefinitionComponent {

  wallets: Wallet[];

  walletForm: FormGroup;

  constructor(private fb: FormBuilder, private httpClient: ApplicationHttpClient, private walletService: WalletService, private messageService: MessageService) {
    this.initForm(null);
    this.fetchWallets();
  }

  initForm(wallet: any) {
    if (!wallet) {
      wallet = {};
      wallet.fastAccess = true;
    }

    this.walletForm = this.fb.group({
      Id: [wallet.id],
      Name: [wallet.name, [Validators.required], [this.walletNameOccupied.bind(this)]],
      Description: [wallet.description],
      FastAccess: [wallet.fastAccess]
    });
  }

  formSubmit() {
    if (this.walletForm.valid) {
      this.walletService.save((this.walletForm.value as Wallet)).subscribe(
        response => {
          this.initForm(null);
          this.messageService.success(null, 'Wallet is saved successfull!');
          this.fetchWallets();
        },
        err => {
          this.messageService.error(null, 'Something goes wrong while try to save wallet.');
          console.log(JSON.stringify(err));
        }
      )
    } else {
      this.name.markAsTouched();
    }
  }

  editBtnClick(wallet: Wallet) {

  }

  fetchWallets() {
    this.walletService.fetchAll().subscribe(
      res => {
        this.wallets = res;
      },
      err => {

      }
    );
  }



  get name() {
    return this.walletForm.get('Name');
  }


  // validators
  walletNameOccupied(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    return this.httpClient.get(`/wallet/isNameOccupied?name=${ctrl.value}`).pipe(
      map(isOccupied => (isOccupied ? { nameOccupied: true } : null)),
      catchError(() => null)
    );
  }
}


