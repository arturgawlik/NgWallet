import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/directives/directives.module';
import { CommonModule } from '@angular/common';
import { CategoriesDefinitionComponent } from './categories-definition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ColorComponent } from '../color/color.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const routes: Routes = [
    {
      path: '',
      component: CategoriesDefinitionComponent
    }
  ];

@NgModule({
    declarations: [
        CategoriesDefinitionComponent,
        ColorComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        TableModule,
        SharedModule,
        ColorPickerModule,
        ConfirmDialogModule
    ]
})
export class CategoriesDefinitionModule {
}
