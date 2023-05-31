import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrainStormService } from '../services/brain-storm-service/brain-storm.service';
import { BrainStorm } from '../model/BrainStorm';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public title!: string;
  public formObject!: string;

  ideaTitle!: string;
  brainStormTitle!: string;
  brainStormDescription!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { title: string; formObject: string },
    private brainStormService : BrainStormService,
    private dialog: MatDialogRef<DialogComponent>
  ) {
    this.title = data.title;
    this.formObject = data.formObject;
  }

  createBrainStorm(title: string, description: string): void {
    const brainStorm = {
        title: title,
        description: description,
        userId: parseInt(localStorage.getItem("userId") || "0")
    }
    this.brainStormService.createBrainStorm(brainStorm).subscribe((res) => {
      this.dialog.close();
      this.brainStormService.getAllBrainStorms(parseInt(localStorage.getItem("userId") || "0"));
    });
  }

  // createIdea(title: string) {
  //   const idea = {
  //     title: title
  //   }
  //   // const brainStormId = parseInt(localStorage.getItem(""))
  //   this.brainStormService.createIdea(idea, brainStormId).subscribe((res) => {
  //     this.dialog.close();
  //     console.log(res);
  //   })
  // }

}
