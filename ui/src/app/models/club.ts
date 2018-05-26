import { Column, Entity, OneToMany } from 'entitype';

import { Tournement } from './tournement';
import { User } from './user';

@Entity('club')
export class Club {

  @Column({ columnName: `club_id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  clubId: number;

  @Column({ columnName: `club_name`, type: `varchar(45)`, default: null })
  _clubName?: string;

  @OneToMany(type => Tournement, x => x.clubId)
  tournements: Tournement[];

  @OneToMany(type => User, x => x.clubId)
  users: User[];


  public get clubName(): string {
    return this._clubName;
  }

  public set clubName(value: string) {
    this._clubName = value;
  }
}
