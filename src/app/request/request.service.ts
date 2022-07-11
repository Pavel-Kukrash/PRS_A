import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRequest } from './request.class';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

    // fields
    private requestsUrl = environment.backendUrl + "api/requests";

    // constructor with dependency injection
    constructor(private http: HttpClient) {  }
  
    // methods
    listData(): Observable<UserRequest[]> {
      return this.http.get(this.requestsUrl) as Observable<UserRequest[]>
    }    

    getOne(id:number): Observable<UserRequest> {
      return this.http.get(this.requestsUrl + "/" +id) as Observable<UserRequest>
    } 

    getRev(id:number): Observable<UserRequest> {
      return this.http.get(this.requestsUrl + "/" + "review" + "/" +id) as Observable<UserRequest>
    } 

    postData(data: UserRequest): Observable<any> {
      return this.http.post(this.requestsUrl, data)
    }          

    updateData(data: UserRequest, id: number): Observable<UserRequest> {
      return this.http.put(this.requestsUrl + "/" + id, data) as Observable<UserRequest>
    }

    updateRev(data: UserRequest, id: number): Observable<UserRequest> {
      return this.http.put(this.requestsUrl + "/" + id + "review", data) as Observable<UserRequest>
    }

    updateAppr(data: UserRequest, id: number): Observable<UserRequest> {
      return this.http.put(this.requestsUrl + "/" + id + "approve", data) as Observable<UserRequest>
    }

    updateRt(data: UserRequest, id: number): Observable<UserRequest> {
      return this.http.put(this.requestsUrl + "/" + id + "reject", data) as Observable<UserRequest>
    }





    // Delete??
    // deleteData(id: number): Observable<any> {
    //   //return this.http.delete(`${this.usersUrl}/${id}`)
    //   return this.http.delete(this.usersUrl+"/"+id)
    //}

    

}



