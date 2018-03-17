
package com.services;

import com.models.User;
import com.services.RankingDao;

import java.util.List;

/**
 * Service class for ranking
 */
public class RankingService {

    RankingDao rankingDao = new RankingDao();

    public List<User> getRankingBytournementId(int id) {
        return rankingDao.getRankingBytournementId(id);
    }
}
