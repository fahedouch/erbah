import { Column, Entity, ManyToMany, ManyToOne } from 'entitype';

import { Tournement } from './tournement';
import { User } from './user';
import { UserFootmatch } from './user-footmatch';

@Entity('footmatch')
export class Footmatch {
  
  @Column({ columnName: `match_id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  matchId: number;
  
  @Column({ columnName: `match_date_start`, type: `varchar(45)`, default: null })
  matchDateStart?: string;
  
  @Column({ columnName: `match_date_end`, type: `varchar(45)`, default: null })
  matchDateEnd?: string;
  
  @Column({ columnName: `tournement_id`, type: `int(11)`, nullable: false, default: null, index: true })
  tournementId: number;
  
  @ManyToOne(type => Footmatch, x => x.tournementId)
  tournement: Tournement;
  
  @ManyToMany(type => User, joinType => UserFootmatch, x => x.matchId, x => x.userId)
  userFootmatches: User[];
}
