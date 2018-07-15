import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MemoryService} from "../../services";
import {Event} from "../../models/event";
import {SocketService} from "../chat/shared/services/socket.service";
import {User} from "../../models";

@Component({
  selector: 'app-connected-people',
  templateUrl: './connected-people.component.html',
  styleUrls: []
})
export class ConnectedPeopleComponent implements OnInit , AfterViewInit   {

  connectedPeoplePseudo : string[] = [];
  user  = new User();

  constructor(private  memoryService : MemoryService,
              private socketService: SocketService) {
  }


  ngOnInit() {
    //make a subscribe to listen to every notification of connected user
    this.addUserPseudoToConnectedPeople ();

    //make a subscribe to listen to every notification of logout user
    this.removeUserPseudoFromConnectedPeople ();
  }

  /**
   * add User Pseudo To Connected People
   */
  addUserPseudoToConnectedPeople () : void {

    this.memoryService.socketService.onUserPseudoToLogin()
      .subscribe((userPseudo: string) => {
        this.connectedPeoplePseudo.push(userPseudo);
      });
  }

  /**
   * send Connected User Notification
   * @param userPseudo
   */
  public sendConnectedUserNotification (userPseudo): void {
    this.memoryService.socketService.sendUserPseudoToLogin(userPseudo);
  }

  /**
   * remove User PseudoFrom Connected People
   */
  removeUserPseudoFromConnectedPeople () : void {
    this.memoryService.socketService.onUserPseudoToLogout()
      .subscribe((userPseudo: string) => {
        this.connectedPeoplePseudo.splice(this.getUserIndexInConnectedPeoplePseudo(),1);
      });
  }

  /**
   * send Disconnected User Notification
   * @param userPseudo
   */
  public sendDisconnectedUserNotification (userPseudo): void {
    this.memoryService.socketService.sendUserPseudoToLogout(userPseudo);
  }

  getUserIndexInConnectedPeoplePseudo () : number {
    return  this.connectedPeoplePseudo.indexOf(this.user.userPseudo);
  }

  ngAfterViewInit(){
    console.log(this.connectedPeoplePseudo);

  }
}
