import { NgModule } from '@angular/core';
import { WalletDefinitionComponent } from './wallet-definition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/directives/directives.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const routes: Routes = [
    {
      path: '',
      component: WalletDefinitionComponent
    }
  ];


@NgModule({
    declarations: [
        WalletDefinitionComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        TableModule,
        SharedModule,
        ConfirmDialogModule
    ]
})
export class  WalletDefinitionModule {
}
