import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {;
  redirectUrl: string;
  constructor(private http: HttpClient) {
    this.redirectUrl = '';
  }

  register(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/users/register', user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/users/login', user);
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
