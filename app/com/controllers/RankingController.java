package com.controllers;

import com.models.User;
import play.mvc.*;

import java.util.List;
import com.services.RankingService;


public class RankingController extends Controller{

    /**
     *
     * @param id
     * @return
     */
    public Result getRankingBytournementId(int id) {
        RankingService rankingService = new RankingService();
        System.out.println(rankingService.getRankingBytournementId(id));
        return ok();
    }

}


