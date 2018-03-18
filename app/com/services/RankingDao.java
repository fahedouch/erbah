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

        String sql = "SELECT user_name , user_email FROM user u  " +
                "INNER JOIN user_ranking ON user_ranking.user_id = u.user_id " +
                "INNER JOIN ranking ON  ranking.ranking_id = user_ranking.ranking_id " +
                "INNER JOIN tournement ON tournement.tournement_id = ranking.tournement_id AND tournement.tournement_id = :tournementId ";


        RawSql rawSql = RawSqlBuilder.parse(sql)
                .tableAliasMapping("u", "user")
                .tableAliasMapping("ur", "user_ranking")
                .tableAliasMapping("r", "ranking")
                .create();

        List<User> RankingBytournementId = Ebean.find(User.class)
               .setRawSql(rawSql)
               .setParameter("tournementId", tournementId)
                .findList();

       // List<User> RankingBytournementId = Ebean.find(User.class).select("useName")
              //  .findList();

        return RankingBytournementId;
    }
}
