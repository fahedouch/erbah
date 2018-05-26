import { Column, Entity, ManyToOne, OneToMany } from 'entitype';

import { Tournement } from './tournement';
import { UserFootmatch } from './user-footmatch';

@Entity('footmatch')
export class Footmatch {

  @Column({ columnName: `match_id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  _matchId: number;

  @Column({ columnName: `match_date_start`, type: `varchar(45)`, default: null })
  _matchDateStart?: string;

  @Column({ columnName: `match_date_end`, type: `varchar(45)`, default: null })
  _matchDateEnd?: string;

  @Column({ columnName: `tournement_id`, type: `int(11)`, nullable: false, default: null, index: true })
  _tournementId: number;

  @ManyToOne(type => Footmatch, x => x._tournementId)
  _tournement: Tournement;

  @OneToMany(type => UserFootmatch, x => x.matchId)
  _userFootmatches: UserFootmatch[];


  public get matchId(): number {
    return this._matchId;
  }

  public set matchId(value: number) {
    this._matchId = value;
  }

  public get matchDateStart(): string {
    return this._matchDateStart;
  }

  public set matchDateStart(value: string) {
    this._matchDateStart = value;
  }

  public get matchDateEnd(): string {
    return this._matchDateEnd;
  }

  public set matchDateEnd(value: string) {
    this._matchDateEnd = value;
  }

  public get tournementId(): number {
    return this._tournementId;
  }

  public set tournementId(value: number) {
    this._tournementId = value;
  }

  public get tournement(): Tournement {
    return this._tournement;
  }

  public set tournement(value: Tournement) {
    this._tournement = value;
  }

  public get userFootmatches(): UserFootmatch[] {
    return this._userFootmatches;
  }

  public set userFootmatches(value: UserFootmatch[]) {
    this._userFootmatches = value;
  }
}
