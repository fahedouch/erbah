import { Column, Entity, ManyToOne } from 'entitype';

import { Tournement } from './tournement';
import { User } from './user';

@Entity('user_tournement')
export class UserTournement {

  @Column({ columnName: `user_id`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  _userId: number;

  @Column({ columnName: `tournement_id`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  _tournementId: number;

  @Column({ columnName: `user_point`, type: `int(11)`, default: null })
  _userPoint?: number;

  @Column({ columnName: `user_victory`, type: `int(11)`, default: null })
  _userVictory?: number;

  @Column({ columnName: `user_null`, type: `int(11)`, default: null })
  _userNull?: number;

  @Column({ columnName: `user_defeat`, type: `int(11)`, default: null })
  _userDefeat?: number;

  @Column({ columnName: `user_goal_scored`, type: `int(11)`, default: null })
  _userGoalScored?: number;

  @Column({ columnName: `user_difference`, type: `int(11)`, default: null })
  _userDifference?: number;

  @Column({ columnName: `user_goal_by_match`, type: `float`, default: null })
  _userGoalByMatch?: number;

  @Column({ columnName: `user_accepted_goal`, type: `int(11)`, default: null })
  _userAcceptedGoal?: number;

  @Column({ columnName: `user_name`, type: `varchar(45)`, default: null })
  _userName?: string;

  @ManyToOne(type => UserTournement, x => x._tournementId)
  _tournement: Tournement;

  @ManyToOne(type => UserTournement, x => x._userId)
  _user: User;


  public get userId(): number {
    return this._userId;
  }

  public set userId(value: number) {
    this._userId = value;
  }

  public get tournementId(): number {
    return this._tournementId;
  }

  public set tournementId(value: number) {
    this._tournementId = value;
  }

  public get userPoint(): number {
    return this._userPoint;
  }

  public set userPoint(value: number) {
    this._userPoint = value;
  }

  public get userVictory(): number {
    return this._userVictory;
  }

  public set userVictory(value: number) {
    this._userVictory = value;
  }

  public get userNull(): number {
    return this._userNull;
  }

  public set userNull(value: number) {
    this._userNull = value;
  }

  public get userDefeat(): number {
    return this._userDefeat;
  }

  public set userDefeat(value: number) {
    this._userDefeat = value;
  }

  public get userGoalScored(): number {
    return this._userGoalScored;
  }

  public set userGoalScored(value: number) {
    this._userGoalScored = value;
  }

  public get userDifference(): number {
    return this._userDifference;
  }

  public set userDifference(value: number) {
    this._userDifference = value;
  }

  public get userGoalByMatch(): number {
    return this._userGoalByMatch;
  }

  public set userGoalByMatch(value: number) {
    this._userGoalByMatch = value;
  }

  public get userAcceptedGoal(): number {
    return this._userAcceptedGoal;
  }

  public set userAcceptedGoal(value: number) {
    this._userAcceptedGoal = value;
  }

  public get userName(): string {
    return this._userName;
  }

  public set userName(value: string) {
    this._userName = value;
  }

  public get tournement(): Tournement {
    return this._tournement;
  }

  public set tournement(value: Tournement) {
    this._tournement = value;
  }

  public get user(): User {
    return this._user;
  }

  public set user(value: User) {
    this._user = value;
  }
}
