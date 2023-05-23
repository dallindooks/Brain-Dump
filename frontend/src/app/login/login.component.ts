import { Component, OnInit } from '@angular/core';
import { animiateObject } from './animate-object';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  ngOnInit(): void {
    animiateObject(this.trashHash);
  }

  constructor() {
    this.trashHash["spaceman"] = 100;
    this.trashHash["bottle"] = 5;
    this.trashHash["can"] = 8;
    this.trashHash["chips"] = 2;
    this.trashHash["newspaper"] = 100;
    this.trashHash["satellite"] = 200;
    this.trashHash["trash"] = 75;
    this.trashHash["water-bottle"] = 5;
  }

  trashHash: Record<string, number> = {};

}
