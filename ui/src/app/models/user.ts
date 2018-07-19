import {Column, Entity, ManyToOne, OneToMany} from 'entitype';

import { UserFootmatch } from './user-footmatch';
import { UserTournement } from './user-tournement';
import {Club} from "./club";

@Entity('user')
export class User {

  @Column({ columnName: `user_id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  userId: number;

  @Column({ columnName: `user_name`, type: `varchar(45)`, default: null })
  userName?: string;

  @Column({ columnName: `user_email`, type: `varchar(45)`, default: null })
  userEmail?: string;

  @Column({ columnName: `user_password`, type: `varchar(45)`, default: null })
  userPassword?: string;

  @Column({ columnName: `club_id`, type: `int(11)`, nullable: false, default: null, index: true })
  clubId: number;

  @Column({ columnName: `user_pseudo`, type: `varchar(255)`, default: null })
  userPseudo?: string;

  @ManyToOne(type => User, x => x.clubId)
  club: Club;

  @OneToMany(type => UserFootmatch, x => x.userId)
  userFootmatches: UserFootmatch[];

  @OneToMany(type => UserTournement, x => x.userId)
  userTournements: UserTournement[];

  userAvatar : string;

  private userStatusOn : boolean;

  private userRole : string;


  constructor(userId?: number, userName?: string, userEmail?: string, userPassword?: string, clubId?: number,
              userPseudo?: string, club?: Club, userFootmatches?: UserFootmatch[], userTournements?: UserTournement[],
              userAvatar?: string, userRole? : string) {
    this.userId = userId;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.clubId = clubId;
    this.userPseudo = userPseudo;
    this.club = club;
    this.userFootmatches = userFootmatches;
    this.userTournements = userTournements;
    this.userAvatar = userAvatar;
    this.userRole = userRole;
  }


  public getuserRole(): string {
    return this.userRole;
  }

  public setuserRole(value: string) {
    this.userRole = value;
  }

  public getuserStatusOn(): boolean {
    return this.userStatusOn;
  }

  public setuserStatusOn(value: boolean) {
    this.userStatusOn = value;
  }

  public setuserAvatar(value: string) {
    this.userAvatar = value;
  }

  public getuserAvatar(): string {
    return this.userAvatar;
  }

  public getClubId(): number {
    return this.clubId;
  }

  public setClubId(value: number) {
    this.clubId = value;
  }

  public getUserPseudo(): string {
    return this.userPseudo;
  }

  public setUserPseudo(value: string) {
    this.userPseudo = value;
  }

  public getClub(): Club {
    return this.club;
  }

  public setClub(value: Club) {
    this.club = value;
  }

  public getUserId(): number {
    return this.userId;
  }

  public setUserId(value: number) {
    this.userId = value;
  }

  public getUserName(): string {
    return this.userName;
  }

  public setUserName(value: string) {
    this.userName = value;
  }

  public getUserEmail(): string {
    return this.userEmail;
  }

  public setUserEmail(value: string) {
    this.userEmail = value;
  }

  public getUserPassword(): string {
    return this.userPassword;
  }

  public setUserPassword(value: string) {
    this.userPassword = value;
  }

  public getUserFootmatches(): UserFootmatch[] {
    return this.userFootmatches;
  }

  public setUserFootmatches(value: UserFootmatch[]) {
    this.userFootmatches = value;
  }

  public getUserTournements(): UserTournement[] {
    return this.userTournements;
  }

  public setUserTournements(value: UserTournement[]) {
    this.userTournements = value;
  }
}
