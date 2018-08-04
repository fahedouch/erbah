import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-rules-dialog',
  templateUrl: './rules-dialog.component.html',
  styleUrls: []
})
export class RulesDialogComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
