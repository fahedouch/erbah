import {
  Component, OnInit, ViewChildren, ViewChild, QueryList, ElementRef,
  AfterViewChecked
} from '@angular/core';
import { MatDialog, MatDialogRef, MatList, MatListItem } from '@angular/material';

import { Action } from '../../models/action';
import { Message } from '../../models/message';
import { User } from '../../models/index';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from '../../dialog-user/dialog-user.component';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService, DataService} from "../../services";
import {MemoryService} from "../../services";

const AVATAR_URL = 'https://api.adorable.io/avatars/285';


@Component({
  selector: 'tcc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked  {
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
              private authenticationService: AuthenticationService,
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
  public initModel(): void {
    this.user.userId = this.authenticationService.decodeTokenInSessionStorage().user_id;
    this.user.userPseudo = this.authenticationService.getPseudoFromSessionStorage();
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
    if (this.authenticationService.canActivate())
      this.initModel();

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
  public sendMessageNotification(user: User, action: Action): void {
    let message: Message;
    if (action === Action.JOINED) {
      message = {
        from: user,
        action: action
      }
    } else if (action === Action.LEFT) {
      message = {
        from: user,
        action: action,
      };
    }

    this.memoryService.socketService.sendMessage(message);
  }


  enbaleDisableInput() : boolean {
     if (this.authenticationService.canActivate())
       return false;
     else
       return true;
     }

}
