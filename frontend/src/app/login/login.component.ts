import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animiateObject } from '../home/animate-object';
import { UserService } from '../services/user-service/user.service';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserData } from '../model/UserData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{
  username!: string;
  password!: string;
  @Output() dataEvent = new EventEmitter<Boolean>();

  toRegister() {
    const data = true;
    this.dataEvent.emit(data);
  }

  login(username: string, password: string): void {
    this.userService
      .loginRequest(username, password)
      .subscribe((response) => {
        this.userService.jwt = response.headers.get('Token') || '';
        this.userService.username = username;
      });
  }

  constructor(private userService: UserService) {
  }

}
