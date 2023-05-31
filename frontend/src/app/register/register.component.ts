import { Component, EventEmitter, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserService } from '../services/user-service/user.service';
import { UserData } from '../model/UserData';

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

  id!: number;
  username!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;

  toLogin() {
    const data = false;
    this.dataEvent.emit(data);
  }

  register(): void {
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
        this.userService.toBrainStorm();
      });
  }

  constructor(private userService: UserService) {
  }

}
