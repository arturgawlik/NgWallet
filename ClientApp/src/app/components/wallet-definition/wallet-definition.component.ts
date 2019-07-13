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
import { Category } from 'src/app/services/category/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-wallet-definition',
  templateUrl: './wallet-definition.component.html',
  styleUrls: ['./wallet-definition.component.css']
})
export class WalletDefinitionComponent {

  wallets: Wallet[];
  categories: Category[]; 

  walletForm: FormGroup;

  actualAction = 'Add new';

  constructor(private fb: FormBuilder, private httpClient: ApplicationHttpClient, private walletService: WalletService, private messageService: MessageService, private categoryService: CategoryService) {
    this.initForm(null);
    this.fetchWallets();
    this.fetchCategories();
  }

  initForm(wallet: any) {
    if (!wallet) {
      wallet = {};
    }

    this.walletForm = this.fb.group({
      Id: [wallet.id],
      Name: [wallet.name, [Validators.required]/*, [this.walletNameOccupied.bind(this)]*/],
      DefaultCategoryId: [wallet.defaultCategoryId, [Validators.required]],
      Description: [wallet.description],
      FastAccess: [wallet.fastAccess]
    });
  }

  formSubmit() {
    console.log(this.walletForm.value);
    if (this.walletForm.valid) {
      this.walletService.save((this.walletForm.value as Wallet)).subscribe(
        response => {
          this.initForm(null);
          this.messageService.success(null, 'Wallet is saved successfull!');
          this.fetchWallets();
          this.actualAction = "Add new";
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
    this.initForm(wallet);
    this.actualAction = "Edit existing";
  }

  reset() {
    this.initForm(null);
    this.actualAction = "Add new";
  }

  fetchWallets() {
    this.walletService.fetchAll().subscribe(
      res => {
        console.log(res);
        this.wallets = res;
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  fetchCategories() {
    this.categoryService.fetchAll().subscribe(
      res => {
        this.categories = res;
      },
      err => {
        console.log(JSON.stringify(err));
      }
    )
  }



  get name() {
    return this.walletForm.get('Name');
  }

  get defaultCategory() {
    return this.walletForm.get('DefaultCategoryId');
  }


  // validators
  walletNameOccupied(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    return this.httpClient.get(`/wallet/isNameOccupied?name=${ctrl.value}`).pipe(
      map(isOccupied => (isOccupied ? { nameOccupied: true } : null)),
      catchError(() => null)
    );
  }
}


