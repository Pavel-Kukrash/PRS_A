import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    // fields
    private usersUrl = environment.backendUrl + "api/users";

    // constructor with dependency injection
    constructor(private http: HttpClient) {  }
  
    // methods
    listData(): Observable<User[]> {
      return this.http.get(this.usersUrl) as Observable<User[]>
    }         
    
    getOne(id:number): Observable<User> {
      return this.http.get(this.usersUrl + "/" +id) as Observable<User>
    } 

    postData(data: User): Observable<any> {
      return this.http.post(this.usersUrl, data)
    }

    updateData(data: User, id: number): Observable<User> {
      return this.http.put(this.usersUrl + "/" + id, data) as Observable<User>
    }

    // Delete??
    // deleteData(id: number): Observable<any> {
    //   //return this.http.delete(`${this.usersUrl}/${id}`)
    //   return this.http.delete(this.usersUrl+"/"+id)
    //}

    loginUser(username:string, password:string)
    {
      let loginUrl = this.usersUrl + "/" + username + "/" + password;
      return this.http.get(loginUrl);
    }
}

