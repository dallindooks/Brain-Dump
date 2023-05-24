import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service/user.service';
import { animiateObject } from './animate-object';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  register: Boolean = false;

  changeComponent(input: Boolean) {
    this.register = input;
  }

  ngOnInit(): void {
    animiateObject(this.trashHash);
  }

  constructor(private userService: UserService) {
    this.trashHash['spaceman'] = 100;
    this.trashHash['bottle'] = 5;
    this.trashHash['can'] = 8;
    this.trashHash['chips'] = 2;
    this.trashHash['newspaper'] = 100;
    this.trashHash['satellite'] = 200;
    this.trashHash['trash'] = 75;
    this.trashHash['water-bottle'] = 5;
  }

  trashHash: Record<string, number> = {};

}
