import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vendor } from './vendor.class';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

    // fields
    private vendorsUrl = environment.backendUrl + "api/vendors";

    // constructor with dependency injection
    constructor(private http: HttpClient) {  }
  
    // methods
    listData(): Observable<Vendor[]> {
      return this.http.get(this.vendorsUrl) as Observable<Vendor[]>
    }    
    getOne(id:number): Observable<Vendor> {
      return this.http.get(this.vendorsUrl + "/" +id) as Observable<Vendor>
    } 
    postData(data: Vendor): Observable<any> {
      return this.http.post(this.vendorsUrl, data)
    }    
    updateData(data: Vendor, id: number): Observable<Vendor> {
      return this.http.put(this.vendorsUrl + "/" + id, data) as Observable<Vendor>
    }
    // Delete??
    // deleteData(id: number): Observable<any> {
    //   //return this.http.delete(`${this.usersUrl}/${id}`)
    //   return this.http.delete(this.usersUrl+"/"+id)
    //}
}


