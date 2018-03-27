package com.controllers;

import play.libs.Json;
import play.mvc.*;

import com.services.RankingService;


public class RankingController extends Controller{


    /**
     * get User Tournaments By Tournament Id
     * @param id
     * @return
     */
    public Result getUserTournamentsTournamentById(int id) {
        RankingService rankingService = new RankingService();
        return ok(Json.toJson(rankingService.getTournamentById(id).getUserTournements()).toString());
    }

    /**
     * get the last 2 tournament
     * @return Json of the last 2 tounrment
     */
    public Result getTournament() {
        RankingService rankingService = new RankingService();

        return ok(Json.toJson((rankingService.getTournament())).toString());
    }

}


