import { Component, OnInit, Renderer2 } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { BrainStorm } from '../model/BrainStorm';
import { BrainStormService } from '../services/brain-storm-service/brain-storm.service';
import { Idea } from '../model/Idea';

@Component({
  selector: 'app-brain-storm',
  templateUrl: './brain-storm.component.html',
  styleUrls: ['./brain-storm.component.scss'],
})
export class BrainStormComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private brainStormService: BrainStormService
  ) {}

  ngOnInit(): void {
    const storedBrainStorm: BrainStorm =
      this.brainStormService.getSelectedBrainStormFromLocalStorage()!;
    if (storedBrainStorm) {
      this.setSelectedBrainStorm(storedBrainStorm);
    }
  }

  selectedBrainStorm!: BrainStorm;
  selectedIdea!: number;
  ideaArr: Idea[] = [];
  ideaChildren = new Map<string, string>();

  openDialog(title: string, formObject: string): void {
    this.dialog
      .open(DialogComponent, {
        width: '500px',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          title: title,
          formObject: formObject,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  setSelectedBrainStorm(storm: BrainStorm) {
    this.selectedBrainStorm = storm;
    this.getIdeas(this.selectedBrainStorm.id);
    this.ideaChildren.clear();
    this.selectedIdea = 0;
  }

  setSelectedIdea(idea: Idea) {
    this.selectedIdea = idea.id;
    this.brainStormService.selectedIdea = idea;
    this.ideaChildren.clear();
    this.ideaChildren.set('what', this.brainStormService.selectedIdea.what);
    this.ideaChildren.set('why', this.brainStormService.selectedIdea.why);
    this.ideaChildren.set('who', this.brainStormService.selectedIdea.who);
    this.ideaChildren.set('when', this.brainStormService.selectedIdea.when_col);
    this.ideaChildren.set('where',this.brainStormService.selectedIdea.where_col);
    this.ideaChildren.set('how', this.brainStormService.selectedIdea.how);
  }

  getIdeas(brainStormId: number) {
    this.brainStormService
      .getIdeasFromBrainStorm(brainStormId)
      .subscribe((res) => {
        this.ideaArr = [];
        res.body?.map((idea) => {
          this.ideaArr.push(idea);
        });
      });
  }
}
