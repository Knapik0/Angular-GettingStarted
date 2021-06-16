import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IProduct } from "./IProduct";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUlr = 'api/products/products.json';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUlr).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error ocured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned value: ${err.status}, error message: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}