import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SharedModule } from 'src/app/directives/directives.module';


const routes: Routes = [
    {
      path: '',
      component: LoginComponent
    }
  ];

@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        AlertModule.forRoot(),
        SharedModule
    ]
})
export class LoginModule {
}

