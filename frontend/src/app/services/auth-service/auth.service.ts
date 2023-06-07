import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  constructor(private http: HttpClient) {}

  isAuthenticated(): Observable<HttpResponse<boolean>> {
      return this.http.get<boolean>(environment.baseApiUrlToken + 'validate-token', {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: localStorage.getItem('token') || '',
          username: localStorage.getItem('username') || ''
        }),
      });
  }
}
