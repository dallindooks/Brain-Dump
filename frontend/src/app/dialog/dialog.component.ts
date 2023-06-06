import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrainStormService } from '../services/brain-storm-service/brain-storm.service';
import { BrainStorm } from '../model/BrainStorm';
import { Idea } from '../model/Idea';
import { UserData } from '../model/UserData';
import { UserService } from '../services/user-service/user.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public title!: string;
  public formObject!: string;

  ideaTitle!: string;
  brainStormTitle!: string;
  brainStormDescription!: string;
  deleted: boolean = false;
  created: boolean = false;
  edited: boolean = false;
  selectedIdea!: Idea;
  currentUser!: UserData;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { title: string; formObject: string },
    private brainStormService : BrainStormService,
    private userService : UserService,
    private dialog: MatDialogRef<DialogComponent>
  ) {
    this.title = data.title;
    this.formObject = data.formObject;
  }

  ngOnInit(): void {
    if (this.formObject == "brainStorm-edit") {
      const selectedBrainStorm = this.brainStormService.getSelectedBrainStormFromLocalStorage()!;
      this.brainStormTitle = selectedBrainStorm.title;
      this.brainStormDescription = selectedBrainStorm.description;
    }
    this.selectedIdea = this.brainStormService.selectedIdea;
    this.currentUser.username = localStorage.getItem("username") || "";
    this.currentUser.firstName = localStorage.getItem("current-user-first-name") || "";
    this.currentUser.lastName = localStorage.getItem("current-user-last-name") || "";
    this.currentUser.email = localStorage.getItem("current-user-last-name") || "";
    this.currentUser.id = parseInt(localStorage.getItem("userId") || '0');
  }

  createBrainStorm(title: string, description: string): void {
    const brainStorm = {
        title: title,
        description: description,
        userId: parseInt(localStorage.getItem("userId") || "0")
    }
    this.brainStormService.createBrainStorm(brainStorm).subscribe((res) => {
      this.dialog.disableClose = true;
      this.created = true;
      this.brainStormService.getAllBrainStorms(parseInt(localStorage.getItem("userId") || "0"));
      localStorage.setItem("selectedBrainStorm", JSON.stringify(res.body));

      setTimeout(() => {
        location.reload();
      }, 1000);

    });
  }

  createIdea() {
    const idea = {
      title: this.ideaTitle
    }
    const brainStorm = this.brainStormService.getSelectedBrainStormFromLocalStorage()!;
    this.brainStormService.createIdea(idea, brainStorm.id).subscribe((res) => {
      this.dialog.close();
      console.log(res);
    })
  }

  deleteBrainStorm(): void {
    const deleteBrainStorm: BrainStorm = this.brainStormService.getSelectedBrainStormFromLocalStorage()!;
    this.brainStormService.deleteBrainStorm(deleteBrainStorm.id).subscribe(()=> {
      console.log("Successfully deleted");
      this.dialog.disableClose = true;
      this.deleted = true;
      localStorage.removeItem("selectedBrainStorm");

      setTimeout(() => {
        location.reload();
      }, 1000);

    }, () => {
      console.log("You've done gone and messed it up");
    })
  }

  editBrainStorm() : void {
    const brainStorm = this.brainStormService.getSelectedBrainStormFromLocalStorage()!;
    brainStorm.title = this.brainStormTitle;
    brainStorm.description = this.brainStormDescription;
    this.brainStormService.editBrainStorm(brainStorm).subscribe((res) => {
      this.dialog.disableClose = true;
      this.edited = true;
      localStorage.setItem("selectedBrainStorm", JSON.stringify(res.body));

      setTimeout(() => {
        location.reload();
      }, 1000);

    });
  }

  editIdea() {
    this.brainStormService.editIdea(this.selectedIdea).subscribe(() => {
      this.dialog.close();
    })
  }

  updateUser() {
    this.userService.editUser(this.currentUser).subscribe(() => {
      this.dialog.close();
    })
  }

}
