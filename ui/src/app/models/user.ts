import {Column, Entity, ManyToOne, OneToMany} from 'entitype';

import { UserFootmatch } from './user-footmatch';
import { UserTournement } from './user-tournement';
import {Club} from "./club";

@Entity('user')
export class User {

  @Column({ columnName: `user_id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  _userId: number;

  @Column({ columnName: `user_name`, type: `varchar(45)`, default: null })
  _userName?: string;

  @Column({ columnName: `user_email`, type: `varchar(45)`, default: null })
  _userEmail?: string;

  @Column({ columnName: `user_password`, type: `varchar(45)`, default: null })
  _userPassword?: string;

  @Column({ columnName: `club_id`, type: `int(11)`, nullable: false, default: null, index: true })
  _clubId: number;

  @Column({ columnName: `user_pseudo`, type: `varchar(255)`, default: null })
  _userPseudo?: string;

  @ManyToOne(type => User, x => x._clubId)
  _club: Club;

  @OneToMany(type => UserFootmatch, x => x.userId)
  _userFootmatches: UserFootmatch[];

  @OneToMany(type => UserTournement, x => x.userId)
  _userTournements: UserTournement[];


  public get clubId(): number {
    return this._clubId;
  }

  public set clubId(value: number) {
    this._clubId = value;
  }

  public get userPseudo(): string {
    return this._userPseudo;
  }

  public set userPseudo(value: string) {
    this._userPseudo = value;
  }

  public get club(): Club {
    return this._club;
  }

  public set club(value: Club) {
    this._club = value;
  }

  public get userId(): number {
    return this._userId;
  }

  public set userId(value: number) {
    this._userId = value;
  }

  public get userName(): string {
    return this._userName;
  }

  public set userName(value: string) {
    this._userName = value;
  }

  public get userEmail(): string {
    return this._userEmail;
  }

  public set userEmail(value: string) {
    this._userEmail = value;
  }

  public get userPassword(): string {
    return this._userPassword;
  }

  public set userPassword(value: string) {
    this._userPassword = value;
  }

  public get userFootmatches(): UserFootmatch[] {
    return this._userFootmatches;
  }

  public set userFootmatches(value: UserFootmatch[]) {
    this._userFootmatches = value;
  }

  public get userTournements(): UserTournement[] {
    return this._userTournements;
  }

  public set userTournements(value: UserTournement[]) {
    this._userTournements = value;
  }
}
