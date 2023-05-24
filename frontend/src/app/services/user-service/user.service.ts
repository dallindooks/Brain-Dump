import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserData } from '../../model/UserData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _username!: String;
  private _jwt!: String;
  private _role!: String;

  public get role(): String {
    return this._role;
    ('');
  }
  public set role(value: String) {
    this._role = value;
  }

  public get jwt(): String {
    return this._jwt;
  }
  public set jwt(value: String) {
    this._jwt = value;
  }

  public get username(): String {
    return this._username;
  }
  public set username(value: String) {
    this._username = value;
  }

  constructor(private http: HttpClient) {}

  loginRequest(
    username: string,
    password: string
  ): Observable<HttpResponse<UserData>> {
    return this.http.post<UserData>(
      environment.baseApiUrlUser + 'login/' + username,
      password,
      {
        observe: 'response',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }
}
