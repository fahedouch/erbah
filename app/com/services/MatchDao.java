package com.services;

import com.models.Tournement;
import io.ebean.Ebean;

import java.util.List;

/**
 * @author DORGAA FAHED
 * Date: 29/03/2018
 * Time: 22:00
 */
public class MatchDao {

    /**
     * get  tounrmenent by Id
     * @param tournamentId
     * @return
     */
    public Tournement getTournamentById(int tournamentId ){

        Tournement tournamentById = Ebean.find(Tournement.class)
                .fetch("footmatches").order().desc("footmatches.matchId")
                .where().eq("tournementId",tournamentId)
                .findOne();
        return tournamentById;
    }

    /**
     * get the last  tounrnament
     * @return tournements
     */
    public List<Tournement> getTournament(){
        List<Tournement> tournaments = Ebean.find(Tournement.class).setMaxRows(1)
                .findList();

        return tournaments;
    }
}
