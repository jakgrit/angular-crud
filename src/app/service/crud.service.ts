import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpHeaderResponse,
  HttpErrorResponse,
} from '@angular/common/http';

export class Book {
  _id!: String;
  name!: String;
  price!: String;
  description!: String;
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  REST_API: string = 'http://localhost:3000';

  httpHeaders = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private httpClinent: HttpClient) {}

  addBook(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/book`;

    return this.httpClinent
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  getBooks(): Observable<any> {
    return this.httpClinent.get(`${this.REST_API}/book`);
  }

  getBook(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/book/${id}`;

    return this.httpClinent.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  updateBook(id: string, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/book/${id}`;
    return this.httpClinent
      .patch(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteBook(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/book/${id}`;

    return this.httpClinent
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status} \n Message: ${error.error.message}`;
    }

    console.log(errorMessage);

    return new Error(errorMessage).message;
  }
}
