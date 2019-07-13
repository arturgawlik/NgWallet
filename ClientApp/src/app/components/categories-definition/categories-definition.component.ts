import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/services/category/models/category.model';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-categories-definition',
  templateUrl: './categories-definition.component.html',
  styleUrls: ['./categories-definition.component.css'],
})
export class CategoriesDefinitionComponent implements OnInit {

  categories: Category[];

  form: FormGroup = null;
  actualAction = "Add new";

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private messageService: MessageService) { }

  ngOnInit() {
    this.initForm(null);
    this.fetchCategories();
  }

  initForm(category): void {
    if (category) {
      this.form = this.fb.group({
        id: [category.id],
        name: [category.name, Validators.required],
        color: [category.color, Validators.required]
      });
    } else {
      this.form = this.fb.group({
        id: ['0'],
        name: ['', Validators.required],
        color: [this.randormColor(), Validators.required]
      });
    }
  }

  editBtnClick(category: Category) {
    this.initForm(category);
    this.actualAction = "Edit existing";
  }

  removeBtnClick(id: number) {
    this.categoryService.remove(id).subscribe(
      s => {
        this.messageService.success(null, 'Category is removed successfull!');
        this.fetchCategories();
      },
      err => {
        this.messageService.error(null, 'Something goes wrong while try to remove category.');
        console.log(JSON.stringify(err));
      }
    )
  }

  save() {
    if (this.form.valid) {
      console.log(JSON.stringify(this.form.value));
      this.categoryService.save(this.form.value).subscribe(
        s => {
          this.messageService.success(null, 'Category is saved successfull!');
          this.initForm(null);
          this.fetchCategories();
          this.actualAction = "Add new";
        },
        err => {
          this.messageService.error(null, 'Something goes wrong while try to save category.');
          console.log(JSON.stringify(err));
        }
      )
    } else {
      this.name.markAllAsTouched();
    }
  }

  reset() {
    this.initForm(null);
    this.actualAction = "Add new";
  }

  private fetchCategories() {
    this.categoryService.fetchAll().subscribe(res => this.categories = res);
  }

  private randormColor(): string {
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }


  get name(): AbstractControl {
    return this.form.get('name');
  }

}
