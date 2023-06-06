import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animiateObject } from '../home/animate-object';
import { UserService } from '../services/user-service/user.service';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserData } from '../model/UserData';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: .85 })),
      transition('void => *', animate('500ms ease-in')),
    ])
  ]
})
export class LoginComponent{
  username!: string;
  password!: string;
  error: Boolean = true;
  errorMessage!: string;
  @Output() dataEvent = new EventEmitter<Boolean>();

  toRegister() {
    const data = true;
    this.dataEvent.emit(data);
  }

  login(username: string, password: string): void {
    localStorage.clear();
    this.userService
      .loginRequest(username, password)
      .subscribe((response) => {
        this.userService.jwt = response.headers.get('Token') || '';
        this.userService.username = username;
        localStorage.setItem("current-user-email", response.body?.email || "");
        localStorage.setItem("current-user-first-name", response.body?.firstName || "");
        localStorage.setItem("current-user-last-name", response.body?.lastName || "");
        this.userService.toBrainStorm();
        localStorage.setItem("token", response.headers.get('Token') || "");
        localStorage.setItem("username", username || "");
        localStorage.setItem("userId", response.body?.id.toString() || "");
      },(err) => {
        this.error = true;
        this.errorMessage = "Invalid User Credentials";
      });
  }

  constructor(private userService: UserService) {
  }

}
