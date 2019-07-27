import { NgModule } from "@angular/core";
import { AuthService } from './services/auth/auth.service';
import { WalletService } from './services/wallet/wallet.service';
import { ApplicationHttpClient } from './services/http/applicationHttpClientService.service';
import { MessageService } from './services/message/message.service';
import { CategoryService } from './services/category/category.service';
import { SubjectService } from './services/subject/subject.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ConfirmationService } from 'primeng/api';

@NgModule({
    providers: [AuthService, AuthGuard, LoginGuard, ApplicationHttpClient, WalletService, MessageService, ConfirmationService, CategoryService, SubjectService],
})
export class ServiceModule {
}
