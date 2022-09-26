import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Student } from '../model/student';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  //Students Endpoint
  basePAth = 'http://localhost:3000/api/v1/students';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }
  
  //API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Deelte Error handling
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened, please try again later.');
  }

  // Create Student
  create(item: any): Observable<Student> {
    return this.http
      .post<Student>(this.basePAth, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2),
        catchError(this.handleError));
  }

  // Get Student by id
  getById(id: any): Observable<Student> {
    return this.http
      .get<Student>(this.basePAth + '/' + id, this.httpOptions)
      .pipe(retry(2),
        catchError(this.handleError));
  }

  // Get all Students
  getAll(): Observable<Student> {
    return this.http
      .get<Student>(this.basePAth, this.httpOptions)
      .pipe(retry(2),
        catchError(this.handleError));
  }

  // Update Student
  update(id: any, item: any): Observable<Student> {
    return this.http
      .put<Student>(this.basePAth + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2),
        catchError(this.handleError));
  }

  // Delete Student
  delete(id: any): Observable<Student> {
    return this.http
      .delete<Student>(this.basePAth + '/' + id, this.httpOptions)
      .pipe(retry(2),
        catchError(this.handleError));
  }
}
