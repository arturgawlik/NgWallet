// -----------------------------------------------------------------------------------------------------  
// --------------------------------------ng modules-----------------------------------------------------    
// -----------------------------------------------------------------------------------------------------  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------       




// -----------------------------------------------------------------------------------------------------  
// --------------------------------------app components-------------------------------------------------    
// -----------------------------------------------------------------------------------------------------  
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './components/shell/shell.component';
import { HomeComponent } from './components/home/home.component';
import { WalletsComponent } from './components/wallets/wallets.component';
import { AddEditWalletComponent } from './components/add-edit-wallet/add-edit-wallet.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WalletDashboardComponent } from './components/wallet-dashboard/wallet-dashboard.component';
import { CategoriesDefinitionComponent } from './components/categories-definition/categories-definition.component';
import { ColorComponent } from './components/color/color.component';
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------         



// -----------------------------------------------------------------------------------------------------  
// --------------------------------------app modules----------------------------------------------------    
// -----------------------------------------------------------------------------------------------------  
import { RoutingModule } from './routing/routing.module';
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------         




// -----------------------------------------------------------------------------------------------------  
// --------------------------------------app services---------------------------------------------------    
// -----------------------------------------------------------------------------------------------------  
import { AuthService } from './services/auth/auth.service';
import { WalletService } from './services/wallet/wallet.service';
import { ApplicationHttpClient } from './services/http/applicationHttpClientService.service';
import { MessageService } from './services/message/message.service';
import { CategoryService } from './services/category/category.service';
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------         




// -----------------------------------------------------------------------------------------------------  
// --------------------------------------app pipes------------------------------------------------------    
// -----------------------------------------------------------------------------------------------------  
import { AbsolutePipe } from './pipes/absolute.pipe';
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------  




// -----------------------------------------------------------------------------------------------------  
// --------------------------------------app guards-----------------------------------------------------    
// -----------------------------------------------------------------------------------------------------  
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------  




// -----------------------------------------------------------------------------------------------------  
// --------------------------------------app directives-------------------------------------------------    
// -----------------------------------------------------------------------------------------------------  
import { AddIsValidIsInvalidClassDirective } from './directives/add-is-valid-is-invalid-class.directive';
import { AddCardRandomColorDirective } from './directives/add-card-random-color.directive';
import { GradientDirective } from './directives/gradient.directive';
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------  




// -----------------------------------------------------------------------------------------------------  
// --------------------------------------3rd part modules-----------------------------------------------    
// -----------------------------------------------------------------------------------------------------  
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ColorPickerModule } from 'primeng/colorpicker';
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------  




// -----------------------------------------------------------------------------------------------------  
// --------------------------------------settings-------------------------------------------------------
// -----------------------------------------------------------------------------------------------------      
import { environment } from '../environments/environment';
import { ValidationMessages } from './directives/validation-massages.directive';
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------  
// -----------------------------------------------------------------------------------------------------  





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShellComponent,
    HomeComponent,
    WalletsComponent,
    AddEditWalletComponent,
    AddIsValidIsInvalidClassDirective,
    AddCardRandomColorDirective,
    SignUpComponent,
    WalletDashboardComponent,
    AbsolutePipe,
    CategoriesDefinitionComponent,
    ValidationMessages,
    ColorComponent,
    GradientDirective
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
    ToastrModule.forRoot(),
    ConfirmDialogModule,
    TableModule,
    ColorPickerModule
  ],
  providers: [AuthService, AuthGuard, LoginGuard, ApplicationHttpClient, WalletService, MessageService, ConfirmationService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule { }
