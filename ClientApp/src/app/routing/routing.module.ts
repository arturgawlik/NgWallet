import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from '../components/shell/shell.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { LoginGuard } from '../guards/login.guard';
import { HomeComponent } from '../components/home/home.component';
import { CategoriesDefinitionComponent } from '../components/categories-definition/categories-definition.component';
import { WalletDefinitionComponent } from '../components/wallet-definition/wallet-definition.component';

const routes: Routes = [
  {
    path: '', component: ShellComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { 
        path: 'home', 
        loadChildren: () => import('../components/home/home.module').then(mod => mod.HomeModule) 
      },
      { 
        path: 'settings/categories-definition', 
        loadChildren: () => import('../components/categories-definition/categories-definition.module').then(mod => mod.CategoriesDefinitionModule) 
      },
      { 
        path: 'settings/wallets-definition', 
        loadChildren: () => import('../components/wallet-definition/wallet-definition.module').then(mod => mod.WalletDefinitionModule) 
      }
    ], canActivate: [AuthGuard]
  },
  { path: 'login', 
    loadChildren: () => import('../components/login/login.module').then(mod => mod.LoginModule)
  , canActivate: [LoginGuard] },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class RoutingModule { }
