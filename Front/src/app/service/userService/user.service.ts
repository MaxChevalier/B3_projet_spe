import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(token?: string): Observable<User> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('authorization', `${token}`);
    }
    const options = { headers: headers};
    return this.http.post<User>('http://localhost:3000/api/users/info',null, options);
  }

  updateUser(user: User, token: string): Observable<User> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('authorization', `${token}`);
    }
    const options = { headers: headers};
    return this.http.put<User>(`http://localhost:3000/api/users/${user.id}`, user, options);
  }
}
