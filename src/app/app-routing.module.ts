import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/book', title: 'angular-crud' },
  {
    path: 'book',
    loadChildren: () =>
      import('./pages/book/book.module').then((m) => m.BookModule),
    title: 'angular-crud',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
