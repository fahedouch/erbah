package com.controllers;

import com.services.MatchService;
import play.libs.Json;
import play.mvc.*;

/**
 * @author DORGAA FAHED
 * Date: 29/03/2018
 * Time: 21:55
 */
public class MatchController extends  Controller{

    /**
     * get Match By Tournament Id
     * @param id : Tournament Id
     * @return matchs
     */
    public Result getMatchByTournamentId(Integer id) {
        MatchService matchService = new MatchService();
        return ok(Json.toJson(matchService.getTournamentById(id).getFootmatches()).toString());
    }

    /**
     * get the last 2 tournament
     * @return Json of the last 2 tounrment
     */
    public Result getTournament() {

        MatchService matchService = new MatchService();

        return ok(Json.toJson((matchService.getTournament())).toString());
    }



}
