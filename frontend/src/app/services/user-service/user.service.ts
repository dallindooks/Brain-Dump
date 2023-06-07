import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserData } from '../../model/UserData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _username!: string;
  private _jwt!: string;
  private _role!: string;

  public get role(): string {
    return this._role;
  }
  public set role(value: string) {
    this._role = value;
  }

  public get jwt(): string {
    return this._jwt;
  }
  public set jwt(value: string) {
    this._jwt = value;
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  constructor(private http: HttpClient, private router: Router) {}

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

  createUser(user: UserData): Observable<HttpResponse<UserData>> {
    return this.http.post<UserData>(environment.baseApiUrlUser + 'add', user, {
      observe: 'response',
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  editUser(user: UserData): Observable<HttpResponse<UserData>> {
    return this.http.put<UserData>(
      environment.baseApiUrlUser + 'update',
      user,
      {
        observe: 'response',
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem("token") || "" }),
      }
    );
  }
}
