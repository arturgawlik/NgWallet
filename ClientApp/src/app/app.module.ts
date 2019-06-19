import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './components/shell/shell.component';
import { RoutingModule } from './routing/routing.module';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { FeatherIconsPipe } from './pipes/feather-pipe';
import { HomeComponent } from './components/home/home.component';
import { ApplicationHttpClient } from './services/http/applicationHttpClientService.service';
import { WalletsComponent } from './components/wallets/wallets.component';
import { AddEditWalletComponent } from './components/add-edit-wallet/add-edit-wallet.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AddIsValidIsInvalidClassDirective } from './directives/add-is-valid-is-invalid-class.directive';
import { AddCardRandomColorDirective } from './directives/add-card-random-color.directive';
import { environment } from '../environments/environment';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WalletDashboardComponent } from './components/wallet-dashboard/wallet-dashboard.component';
import { WalletService } from './services/wallet/wallet.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { AbsolutePipe } from './pipes/absolute.pipe';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToastrModule } from 'ngx-toastr';
import { MessageService } from './services/message/message.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShellComponent,
    FeatherIconsPipe,
    HomeComponent,
    WalletsComponent,
    AddEditWalletComponent,
    AddIsValidIsInvalidClassDirective,
    AddCardRandomColorDirective,
    SignUpComponent,
    DashboardComponent,
    WalletDashboardComponent,
    AbsolutePipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RoutingModule,
    AngularFireModule.initializeApp(environment.af),
    AngularFireAuthModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    ChartModule,
    ScrollingModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, LoginGuard, ApplicationHttpClient, WalletService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
