import { Column, Entity, OneToMany } from 'entitype';

import { Footmatch } from './footmatch';
import { UserTournement } from './user-tournement';

@Entity('tournement')
export class Tournement {
  
  @Column({ columnName: `tournement_id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  tournementId: number;
  
  @Column({ columnName: `tournement_date_start`, type: `varchar(45)`, default: null })
  tournementDateStart?: string;
  
  @Column({ columnName: `tournement_date_end`, type: `varchar(45)`, default: null })
  tournementDateEnd?: string;
  
  @OneToMany(type => Footmatch, x => x.tournementId)
  footmatches: Footmatch[];
  
  @OneToMany(type => UserTournement, x => x.tournementId)
  userTournements: UserTournement[];
}
