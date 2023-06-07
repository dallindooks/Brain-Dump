import { Component, EventEmitter, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserService } from '../services/user-service/user.service';
import { UserData } from '../model/UserData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: .85 })),
      transition('void => *', animate('500ms ease-in')),
    ])
  ]
})
export class RegisterComponent {
  @Output() dataEvent = new EventEmitter<Boolean>();
  loggedInUser = new Map<string, string>();
  id!: number;
  username: string = "";
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  password: string = "";
  confirmPassword: string = "";
  invalidToggle: boolean = true;
  error: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  toLogin() {
    const data = false;
    this.dataEvent.emit(data);
  }

  register(): void {
    if (this.username.length > 0
      && this.email.length > 0
      && this.firstName.length > 0
      && this.lastName.length > 0
      && this.password.length > 0
      && this.confirmPassword.length > 0
      && this.confirmPassword == this.password
      ){
        this.invalidToggle = false;
    }
    if (this.invalidToggle){
      this.error = true;
      return;
    }
    const user : UserData = {
      id: this.id,
      username: this.username,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      jwt: ''
    }
    this.userService
      .createUser(user)
      .subscribe((response) => {
        this.userService.jwt = response.headers.get('Token') || '';
        this.userService.username = response.body?.username || '';
        localStorage.clear();
        localStorage.setItem("username", response.body?.username || "")
        localStorage.setItem("current-user-email", response.body?.email || "");
        localStorage.setItem("current-user-first-name", response.body?.firstName || "");
        localStorage.setItem("current-user-last-name", response.body?.lastName || "");
        localStorage.setItem("token", this.userService.jwt);
        this.router.navigateByUrl('/welcome');
      });
  }

}
