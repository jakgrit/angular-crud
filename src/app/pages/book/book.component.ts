import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { CrudService } from '../../service/crud.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

interface BookItem {
  _id: string;
  name: string;
  price: number;
  author: string;
  description: string;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  styles: [
    `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `,
    `
      .login-form {
        max-width: 300px;
      }

      .login-form-margin {
        margin-bottom: 16px;
      }

      .login-form-forgot {
        float: right;
      }

      .login-form-button {
        width: 100%;
      }
    `,
  ],
})
export class BookComponent implements OnInit {
  public name: string = '';
  public price: number = 0;
  public description: string = '';
  public author: string = '';
  public _id: string = '';

  listOfData: BookItem[] = [];

  confirmModal?: NzModalRef;

  constructor(
    private fb: NonNullableFormBuilder,
    private modal: NzModalService,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {
    this.bookList();
  }

  // Form
  validateForm: FormGroup<{
    name: FormControl<string | null>;
    price: FormControl<number | null>;
    description: FormControl<string | null>;
    author: FormControl<string | null>;
  }> = this.fb.group({
    name: this.fb.control<string | null>(null, Validators.required),
    price: this.fb.control<number | null>(null, Validators.required),
    description: this.fb.control<string | null>(null, Validators.required),
    author: this.fb.control<string | null>(null, Validators.required),
  });

  // Modal
  isVisible = false;
  isEdit = false;

  showModal(): void {
    this.isVisible = true;
  }

  disableModal(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      if (this.isEdit) {
        this.crudService
          .updateBook(this._id, this.validateForm.value)
          .subscribe({
            next: (v) => {
              this.isVisible = false;
              this.resetData();
              this.isEdit = false;
              this.bookList();
            },
            error: (e) => {
              console.log('update book error -----> ', e);
            },
          });
      } else {
        this.crudService.addBook(this.validateForm.value).subscribe({
          next: (v) => {
            this.isVisible = false;
            this.resetData();
            this.bookList();
          },
          error: (e) => {
            console.log('add book error -----> ', e);
          },
        });
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleEdit(book: BookItem): void {
    this.showModal();
    this.isEdit = true;
    this.name = book.name;
    this.price = book.price;
    this.author = book.author;
    this.description = book.description;
    this._id = book._id;
  }

  // Confirm Modal
  showConfirm(book: BookItem): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzOnOk: () =>
        this.crudService.deleteBook(book._id).subscribe({
          next: (v) => {
            this.bookList();
          },
          error: (e) => {
            console.log('delete book error ----> ', e);
          },
        }),
    });
  }

  // fetch
  bookList() {
    this.crudService.getBooks().subscribe((res) => {
      this.listOfData = res;
    });
  }

  // reset
  resetData(): void {
    this.name = '';
    this.author = '';
    this.description = '';
    this.price = 0;
  }
}
