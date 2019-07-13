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
import { ConfirmationService } from 'primeng/api';
import { Category } from 'src/app/services/category/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.css'],
})
export class WalletDashboardComponent implements OnInit {

  walletId: number;

  private wallet$: Wallet
  private walletChartResult$: WalletChartResult;
  form: FormGroup;
  isChangeSaving = false;
  allWallets: Wallet[];
  categories: Category[];

  constructor(private walletService: WalletService, private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private categoryService: CategoryService, private subjectService: SubjectService) {
    this.subjectService.getMessage().subscribe(
      v => {
        if (v) {
          this.walletId = v;
        }
      }
    )
  }

  ngOnInit() {
    this.initForm();
    this.walletService.fetchAll().subscribe(r => {
      this.allWallets = r;
      this.walletId = r[0].id;
      this.fetchData();
    });
    this.categoryService.fetchAll().subscribe(r => {
      this.categories = r;
    });
  }

  initForm() {
    this.form = this.fb.group({
      operationType: ['outcome'],
      value: ['', [Validators.required, positiveNumberValidator]],
      description: [''],
      categoryId: ['', Validators.required],
      walletId: [this.walletId]
    });
  }

  fetchData() {
    this.walletService.getWallet(this.walletId).subscribe(x => {
      this.wallet$ = x;
      this.form.get('categoryId').setValue(this.wallet$.defaultCategoryId);
    });
    this.walletService.getWalletChart(this.walletId).subscribe(x => { console.log(x); this.walletChartResult$ = x; });
    this.initForm();
  }

  saveChange() {
    if (this.form.valid) {
      console.log(JSON.stringify(this.form.value));
      this.isChangeSaving = true;
      this.walletService.saveChange(this.form.value).subscribe(
        s => {
          this.initForm();
          this.fetchData();
          this.messageService.success(null, 'Wallet change is saved successfull!');
          this.isChangeSaving = false;
        },
        err => {
          this.messageService.error(null, 'Something goes wrong while try to save change.');
          console.log(JSON.stringify(err));
          this.isChangeSaving = false;
        }
      )
    } else {
      this.formValue.markAsDirty();
      this.formCategory.markAsDirty();
    }
  }

  removeChange(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you remove this change?',
      accept: () => {
        this.walletService.removeChange(id).subscribe(
          s => {
            this.messageService.success(null, 'Change is successfull removed!');
            this.fetchData();
          },
          err => {
            this.messageService.error(null, 'Something goes wrong while try to remove change.');
          }
        )
      },
      reject: () => {
        console.log('do not remove ' + id);
      }
    });
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

  get formCategory(): AbstractControl {
    return this.form.get('categoryId');
  }

  //#endregion

}
