import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LoginGuard } from '../guards/login.guard';
import { ShellComponent } from '../components/shell/shell.component';
import { loadHomeModule, loadCadegoriesDefintionModule, loadWalletDefinitionModule, loadLoginModule } from './loadChildren.functions';

export const routes: Routes = [
    {
      path: '', component: ShellComponent,
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        {
          path: 'home',
          loadChildren: loadHomeModule
        },
        {
          path: 'settings/categories-definition',
          loadChildren: loadCadegoriesDefintionModule
        },
        {
          path: 'settings/wallets-definition',
          loadChildren: loadWalletDefinitionModule
        }
      ], canActivate: [AuthGuard],
    },
    { path: 'login',
      loadChildren: loadLoginModule
    , canActivate: [LoginGuard] },
  ];
