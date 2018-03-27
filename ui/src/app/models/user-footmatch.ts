import { Column, Entity } from 'entitype';


@Entity('user_footmatch')
export class UserFootmatch {
  
  @Column({ columnName: `user_id`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  userId: number;
  
  @Column({ columnName: `match_id`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  matchId: number;
}
