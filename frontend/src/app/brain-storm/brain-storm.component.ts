import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { BrainStorm } from '../model/BrainStorm';
import { BrainStormService } from '../services/brain-storm-service/brain-storm.service';
import { Idea } from '../model/Idea';

@Component({
  selector: 'app-brain-storm',
  templateUrl: './brain-storm.component.html',
  styleUrls: ['./brain-storm.component.scss']
})
export class BrainStormComponent implements OnInit{

  constructor(public dialog: MatDialog, private brainStormService: BrainStormService) {}

  ngOnInit(): void {
    const storedBrainStorm = localStorage.getItem('selectedBrainStorm');
    if (storedBrainStorm) {
      const parsedBrainStorm = JSON.parse(storedBrainStorm) as BrainStorm;
      this.setSelectedBrainStorm(parsedBrainStorm);
    }
  }

  selectedBrainStorm!: BrainStorm;
  ideaArr: Idea[] = [];

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: "Add Idea",
        formObject: "idea"
      }
    });
  }

  setSelectedBrainStorm(storm: BrainStorm) {
    this.selectedBrainStorm = storm;
    this.getIdeas(this.selectedBrainStorm.id);
  }

  getIdeas(brainStormId: number) {
    this.brainStormService.getIdeasFromBrainStorm(brainStormId).subscribe((res) => {
      this.ideaArr = [];
      res.body?.map((idea) => {
        this.ideaArr.push(idea);
      })
    });
  }
}
