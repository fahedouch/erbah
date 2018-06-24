import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {DialogUserComponent} from "../dialog-user/dialog-user.component";
import {MatDialog, MatDialogRef} from "@angular/material";
import {AuthenticationService} from '../services/index' ;


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
  menuUser: String[];
  userMenuList: any;
  dialogRef: MatDialogRef<DialogUserComponent> | null;
  loginState: boolean = false;


  constructor(public dialog: MatDialog,
              private authenticationService: AuthenticationService ) { }

  ngOnInit() {
    this.imgLogo = "logo.png";
    this.menuUser = ['logout'];
    this.userMenuList = [
      {
        "itemName": "logout",
        "icon": "power_settings_new"
      }
    ];
  }

  /**
   * open Login Popup
   */
  private openLoginPopup(): void {
    this.dialogRef = this.dialog.open(DialogUserComponent,{
      panelClass : ['userLogin'],
      disableClose: false,
    });
    this.dialogRef.componentInstance.loginState.subscribe(x => this.loginState = x
    );
  }

  /**
   * Session user logout
   */
  private logout(): void{
    this.authenticationService.logout();
    this.loginState = false;
  }

}
