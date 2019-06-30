import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from '../components/shell/shell.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { LoginGuard } from '../guards/login.guard';
import { HomeComponent } from '../components/home/home.component';
import { WalletsComponent } from '../components/wallets/wallets.component';
import { CategoriesDefinitionComponent } from '../components/categories-definition/categories-definition.component';

const routes: Routes = [
  {
    path: '', component: ShellComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'wallets', component: WalletsComponent },
      { path: 'settings/categories-definition', component: CategoriesDefinitionComponent }
    ], canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class RoutingModule { }
