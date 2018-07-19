import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {DialogUserComponent} from "../dialog-user/dialog-user.component";
import {MatDialog, MatDialogRef} from "@angular/material";
import {AuthenticationService} from '../services/index' ;
import {ChatComponent} from "../body/chat/chat.component";
import {Action} from "../models/action";
import {MemoryService} from "../services";
import {SocketService} from "../body/chat/shared/services/socket.service";
import {TranslateService} from "@ngx-translate/core";
import {ConnectedPeopleComponent} from "../body/connected-people/connected-people.component";

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
  AVATAR_URL = 'https://api.adorable.io/avatars/285';

  constructor(public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private  memoryService : MemoryService,
              private socketService : SocketService,
              private chatComponent : ChatComponent,
              private connectedPeopleComponent : ConnectedPeopleComponent,
              private translate: TranslateService) { }

  ngOnInit() {
    this.imgLogo = "logo1.png";
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
   this.doActionsAfterClosingPopUp();
  }


  /**
   * action to do are : loginState init & initIoConnection & sendNotification
   */
  doActionsAfterClosingPopUp(): void {
      this.dialogRef.afterClosed().subscribe(paramsDialog => {
        this.socketService.initSocket();

        this.loginState = this.getLoginState(paramsDialog);
        if (this.loginState) {
        this.initChatComponent();
        this.setupChat(paramsDialog);
        this.setupConnectedPeople();
     }
    });
  }


  getLoginState(paramsDialog) : boolean {
    if (paramsDialog){
      return paramsDialog;
    }else {
      return false;
    }
  }


  /**
   * init chat Component
   * @returns {ChatComponent}
   */
  initChatComponent () : void {
    this.chatComponent.user.userId = this.authenticationService.decodeTokenInSessionStorage().user_id ;
    this.chatComponent.user.userPseudo = this.authenticationService.getPseudoFromSessionStorage() ;
    this.chatComponent.user.userAvatar = `${this.AVATAR_URL}/${1}.png`;
  }


  /**
   * setup chat
   * @param paramsDialog
   */
  setupChat (paramsDialog) : void {
    this.chatComponent.sendMessageNotification(paramsDialog, Action.JOINED);
  }


  setupConnectedPeople () {
    this.connectedPeopleComponent.sendConnectedUserNotification(this.authenticationService.getPseudoFromSessionStorage());
  }


  /**
   * Session user logout
   */
  private logout(): void{
    this.connectedPeopleComponent.sendDisconnectedUserNotification(this.authenticationService.getPseudoFromSessionStorage());
    this.authenticationService.logout();
    this.loginState = false;
  }

}
