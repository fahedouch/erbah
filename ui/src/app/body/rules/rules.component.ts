import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {RulesDialogComponent} from "./rules-dialog/rules-dialog.component";

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: []
})
export class RulesComponent implements OnInit {

  name: string;

  constructor(public dialog: MatDialog) { }

  /**
   * open dialog rule
   * @param topic
   */
  openDialog(topic): void {
    this.dialog.open(RulesDialogComponent, {
      data: { name: topic }
    });

  }

  ngOnInit() {
  }

}

