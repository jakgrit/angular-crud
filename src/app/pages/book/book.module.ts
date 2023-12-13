import { NgModule } from '@angular/core';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [
    BookRoutingModule,
    NzTableModule,
    CommonModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
  ],
  declarations: [BookComponent],
  exports: [BookComponent],
})
export class BookModule {}
