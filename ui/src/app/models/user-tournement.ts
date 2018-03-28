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

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get tournementId(): number {
    return this._tournementId;
  }

  set tournementId(value: number) {
    this._tournementId = value;
  }

  get userPoint(): number {
    return this._userPoint;
  }

  set userPoint(value: number) {
    this._userPoint = value;
  }

  get userVictory(): number {
    return this._userVictory;
  }

  set userVictory(value: number) {
    this._userVictory = value;
  }

  get userNull(): number {
    return this._userNull;
  }

  set userNull(value: number) {
    this._userNull = value;
  }

  get userDefeat(): number {
    return this._userDefeat;
  }

  set userDefeat(value: number) {
    this._userDefeat = value;
  }

  get userGoalScored(): number {
    return this._userGoalScored;
  }

  set userGoalScored(value: number) {
    this._userGoalScored = value;
  }

  get userDifference(): number {
    return this._userDifference;
  }

  set userDifference(value: number) {
    this._userDifference = value;
  }

  get userGoalByMatch(): number {
    return this._userGoalByMatch;
  }

  set userGoalByMatch(value: number) {
    this._userGoalByMatch = value;
  }

  get userAcceptedGoal(): number {
    return this._userAcceptedGoal;
  }

  set userAcceptedGoal(value: number) {
    this._userAcceptedGoal = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get tournement(): Tournement {
    return this._tournement;
  }

  set tournement(value: Tournement) {
    this._tournement = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
