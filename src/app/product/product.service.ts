import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    // fields
    private productsUrl = environment.backendUrl + "api/products";

    // constructor with dependency injection
    constructor(private http: HttpClient) {  }
  
    // methods
    listData(): Observable<Product[]> {
      return this.http.get(this.productsUrl) as Observable<Product[]>
    }    

    getOne(id:number): Observable<Product> {
      return this.http.get(this.productsUrl + "/" +id) as Observable<Product>
    } 


    postData(data: Product): Observable<any> {
      return this.http.post(this.productsUrl, data)
    }

    updateData(data: Product, id: number): Observable<Product> {
      return this.http.put(this.productsUrl + "/" + id, data) as Observable<Product>
    }

    
    // Delete??
    // deleteData(id: number): Observable<any> {
    //   //return this.http.delete(`${this.usersUrl}/${id}`)
    //   return this.http.delete(this.usersUrl+"/"+id)
    //}
}



