import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() dataEvent = new EventEmitter<Boolean>();

  toLogin() {
    const data = false;
    this.dataEvent.emit(data);
  }

}
