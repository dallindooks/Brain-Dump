import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BrainStorm } from '../model/BrainStorm';
import { BrainStormService } from '../services/brain-storm-service/brain-storm.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() selectedBrainStorm: EventEmitter<BrainStorm> = new EventEmitter<BrainStorm>();

  username!: string;
  userId!: number;
  brainStormArr: BrainStorm[] = [];
  selected!: number;

  constructor (private brainStormService: BrainStormService, public dialog: MatDialog, private router: Router) {

  }

  ngOnInit(): void {
    this.setUserName();
    this.getBrainStorms(this.userId);
    const storedBrainStorm = localStorage.getItem('selectedBrainStorm');
    if (storedBrainStorm) {
      const parsedBrainStorm = JSON.parse(storedBrainStorm) as BrainStorm;
      this.selected = parsedBrainStorm.id;
    }
  }

  setUserName(): void{
    this.username = localStorage.getItem("username") || "";
    this.userId = parseInt(localStorage.getItem("userId") || "0");
  }

  getBrainStorms(userId: number) : void{
    this.brainStormService.getAllBrainStorms(userId).subscribe((res) => {
      res.body?.map((storm) => {
        this.brainStormArr.push(storm);
      })
    });
  }

  setSelectedBrainStorm(storm: BrainStorm) {
    this.selectedBrainStorm.emit(storm);
    localStorage.setItem('selectedBrainStorm', JSON.stringify(storm));
  }

  openDialog(title: string, formObject: string): void {
    this.dialog.open(DialogComponent, {
      width: '500px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
        formObject: formObject
      }
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }

}
