import { Column, Entity, ManyToMany, OneToMany } from 'entitype';

import { Footmatch } from './footmatch';
import { UserFootmatch } from './user-footmatch';
import { UserTournement } from './user-tournement';

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
  
  @ManyToMany(type => Footmatch, joinType => UserFootmatch, x => x.userId, x => x.matchId)
  userFootmatches: Footmatch[];
  
  @OneToMany(type => UserTournement, x => x.userId)
  userTournements: UserTournement[];
}
