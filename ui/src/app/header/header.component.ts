import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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

  constructor() { }

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

}
