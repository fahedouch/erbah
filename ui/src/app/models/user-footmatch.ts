import { Column, Entity, ManyToOne } from 'entitype';

import { Footmatch } from './footmatch';
import { User } from './user';

@Entity('user_footmatch')
export class UserFootmatch {

  @Column({ columnName: `user_id`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  _userId: number;

  @Column({ columnName: `match_id`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  _matchId: number;

  @Column({ columnName: `user_goal`, type: `int(11)`, default: null })
  _userGoal?: number;

  @ManyToOne(type => UserFootmatch, x => x._matchId)
  _match: Footmatch;

  @ManyToOne(type => UserFootmatch, x => x._userId)
  _user: User;


  public get userId(): number {
    return this._userId;
  }

  public set userId(value: number) {
    this._userId = value;
  }

  public get matchId(): number {
    return this._matchId;
  }

  public set matchId(value: number) {
    this._matchId = value;
  }

  public get userGoal(): number {
    return this._userGoal;
  }

  public set userGoal(value: number) {
    this._userGoal = value;
  }

  public get match(): Footmatch {
    return this._match;
  }

  public set match(value: Footmatch) {
    this._match = value;
  }

  public get user(): User {
    return this._user;
  }

  public set user(value: User) {
    this._user = value;
  }
}
