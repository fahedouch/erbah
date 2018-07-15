import {
  Component, OnInit, ViewChildren, ViewChild, Injectable, QueryList, ElementRef,
  AfterViewChecked
} from '@angular/core';
import { MatDialog, MatDialogRef, MatList, MatListItem } from '@angular/material';

import { Action } from '../../models/action';
import { Event } from '../../models/event';
import { Message } from '../../models/message';
import { User } from '../../models/index';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from '../../dialog-user/dialog-user.component';
import {TranslateService} from '@ngx-translate/core';
import {DataService} from "../../services";
import {MemoryService} from "../../services";

const AVATAR_URL = 'https://api.adorable.io/avatars/285';


@Component({
  selector: 'tcc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  action = Action;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  user  = new User();
  CSRFtoken : string;
  dialogRef: MatDialogRef<DialogUserComponent> | null;


  // getting a reference to the overall list, which is the parent container of the list items
  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService,
              public dialog: MatDialog,
              private translate: TranslateService,
              private dataService : DataService,
              private memoryService : MemoryService) {

    translate.setDefaultLang('en');
    translate.use('fr');
  }


  ngOnInit(): void {
    this.addMessageInMessages();
  }

  ngAfterViewChecked(): void {
    // subscribing to any changes in the list of items / messages
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  // auto-scroll fix: inspired by this stack overflow post
  // https://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style
  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  /**
   * User Model initalization
   */
  public initModel(userId : number , userPseudo: string): void {
    this.user.userId = userId;
    this.user.userPseudo = userPseudo;
    this.user.userAvatar = `${AVATAR_URL}/${1}.png`;
  }



  /**
   * add Message in Messages
   */
  addMessageInMessages () : void {
    this.ioConnection = this.memoryService.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });
  }


  /**
   * send Message
   * @param {string} message
   */
  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    this.memoryService.socketService.sendMessage({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }

  /**
   * send Notification joind or left
   * @param params
   * @param {Action} action
   */
  public sendMessageNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    } else if (action === Action.LEFT) {
      message = {
        from: this.user,
        action: action,
      };
    }

    this.memoryService.socketService.sendMessage(message);
  }


}
