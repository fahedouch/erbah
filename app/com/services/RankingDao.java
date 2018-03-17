package com.services;

import io.ebean.*;
import com.models.User;
import java.util.*;


/**
 * Dao layer for raking
 */
public class RankingDao {

    /**
     *
     * @return  ranking
     */
    public List<User> getRankingBytournementId(int tournementId ){

        String sql = "SELECT u.name , u.email FROM user u  , user_ranking ur , ranking r " +
                " WHERE u.user_id = ur.user_id , ur.user_id = r.user_id and" +
                " r.tournement_id = :tournementId  " ;

        Ebean.createSqlUpdate(sql).execute();
        RawSql rawSql = RawSqlBuilder.parse(sql)
                .tableAliasMapping("u", "user")
                .tableAliasMapping("ur", "user_ranking")
                .tableAliasMapping("r", "ranking")
                .create();

        List<User> RankingBytournementId = Ebean.find(User.class)
                .setRawSql(rawSql)
                .setParameter("tournementId", tournementId)
                .findList();

        return RankingBytournementId;
    }
}
