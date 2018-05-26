package com.services;

import com.models.Tournement;
import io.ebean.*;
import java.util.List;



/**
 * Dao layer for raking
 */
public class RankingDao {

    /**
     * get  tounrmenent by Id
     * @param tournamentId
     * @return
     */
    public Tournement getTournamentById(int tournamentId ){

        Tournement tournamentById = Ebean.find(Tournement.class)
                .fetch("userTournements").order().desc("userTournements.userPoint")
                .where().eq("tournementId",tournamentId)
                .findOne();
        return tournamentById;
    }

    /**
     * get the last 2 tounrment
     * @return tournements
     */
    public List<Tournement> getTournament(){
        List<Tournement> tournaments = Ebean.find(Tournement.class).setMaxRows(2)
                .findList();

        return tournaments;
    }

}
