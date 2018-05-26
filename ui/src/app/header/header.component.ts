import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {DialogUserComponent} from "../dialog-user/dialog-user.component";
import {MatDialog, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
  animations: [
    trigger('menuUserAnim', [
      state('in', style({
        transform: 'translateY(17%)',
      })),
      state('out', style({
        transform: 'translateY(-300%)',
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  imgLogo: String;
  userPicture: String;
  userName: String;
  userMail: String;
  menuUser: String[];
  userMenuList: any;
  menuState: string;
  showUser;
  dialogRef: MatDialogRef<DialogUserComponent> | null;


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.imgLogo = "logo.png";
    this.userPicture = "picture.png";
    this.userName = "Jean-Paul.Dupont-Riviere";
    this.userMail = "Jean-Paul.Dupont-Riviere@gmail.com";
    this.menuUser = ['Profil', 'logout'];
    this.menuState = 'out';
    this.userMenuList = [
      {
        "itemName": "Profil",
        "icon": "account_circle"
      },
      {
        "itemName": "logout",
        "icon": "power_settings_new"
      }
    ];
    this.showUser = true;
  }



  private openLoginPopup(): void {
    this.dialogRef = this.dialog.open(DialogUserComponent,{
      panelClass : ['userLogin'],
      disableClose: false,
    });
    this.dialogRef.afterClosed().subscribe(paramsDialog => {

      //authentification process
      /*if (!paramsDialog) {
        return;
      }

      this.user.name = paramsDialog.username;
      if (paramsDialog.dialogType === DialogUserType.NEW) {
        this.initIoConnection();
        this.sendNotification(paramsDialog, Action.JOINED);
      } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
        this.sendNotification(paramsDialog, Action.RENAME);
      }*/
    });
  }

}
