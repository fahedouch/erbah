package com.services;

import com.models.Tournement;
import java.util.List;

/**
 * Service class for ranking
 */
public class RankingService {

    RankingDao rankingDao = new RankingDao();

    /**
     * get Ranking By tournement Id
     * @param id
     * @return
     */
    public Tournement getTournamentById(int id) {
        return rankingDao.getTournamentById(id);
    }

    /**
     * get the last 2 tounrment
     * @@return tournements
     */
    public List<Tournement> getTournament(){ return rankingDao.getTournament();}

}
