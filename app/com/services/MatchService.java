package com.services;

import com.models.Tournement;

import java.util.List;

/**
 * @author DORGAA FAHED
 * Date: 29/03/2018
 * Time: 22:00
 */
public class MatchService {

    MatchDao matchDao = new MatchDao();

    /**
     * get tournament buy Id
     * @param id
     * @return tournament
     */
    public Tournement getTournamentById(int id) {
        return matchDao.getTournamentById(id);
    }

    /**
     * get the last  tounrnament
     * @return the last  tounrnament
     */
    public List<Tournement> getTournament(){ return matchDao.getTournament();}


}
