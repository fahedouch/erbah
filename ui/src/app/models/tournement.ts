import {Column, Entity, ManyToOne, OneToMany} from 'entitype';

import { Footmatch } from './footmatch';
import { UserTournement } from './user-tournement';
import {Club} from "./club";

@Entity('tournement')
export class Tournement {

  @Column({ columnName: `tournement_id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  _tournementId: number;

  @Column({ columnName: `tournement_date_start`, type: `varchar(45)`, default: null })
  _tournementDateStart?: string;

  @Column({ columnName: `tournement_date_end`, type: `varchar(45)`, default: null })
  _tournementDateEnd?: string;

  @Column({ columnName: `club_id`, type: `int(11)`, nullable: false, default: null, index: true })
  clubId: number;

  @OneToMany(type => Footmatch, x => x.tournementId)
  _footmatches: Footmatch[];

  @ManyToOne(type => Tournement, x => x.clubId)
  club: Club;

  @OneToMany(type => UserTournement, x => x.tournementId)
  _userTournements: UserTournement[];


  public get tournementId(): number {
    return this._tournementId;
  }

  public set tournementId(value: number) {
    this._tournementId = value;
  }

  public get tournementDateStart(): string {
    return this._tournementDateStart;
  }

  public set tournementDateStart(value: string) {
    this._tournementDateStart = value;
  }

  public get tournementDateEnd(): string {
    return this._tournementDateEnd;
  }

  public set tournementDateEnd(value: string) {
    this._tournementDateEnd = value;
  }

  public get footmatches(): Footmatch[] {
    return this._footmatches;
  }

  public set footmatches(value: Footmatch[]) {
    this._footmatches = value;
  }

  public get userTournements(): UserTournement[] {
    return this._userTournements;
  }

  public set userTournements(value: UserTournement[]) {
    this._userTournements = value;
  }
}
