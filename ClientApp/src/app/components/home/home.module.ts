import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { WalletDashboardComponent } from "../wallet-dashboard/wallet-dashboard.component";
import { SharedModule } from "src/app/directives/directives.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ChartModule } from "primeng/chart";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ButtonsModule } from 'ngx-bootstrap/buttons';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
]

@NgModule({
    declarations: [
        HomeComponent,
        WalletDashboardComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ChartModule,
        ConfirmDialogModule,
        ButtonsModule
    ]
})
export class HomeModule {
}
