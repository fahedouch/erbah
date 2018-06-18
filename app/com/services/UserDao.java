package com.services;

import com.models.User;
import io.ebean.Ebean;

/**
 * @author DORGAA FAHED
 * Date: 10/06/2018
 * Time: 18:17
 */
public class UserDao {

    /**
     * find user by pseudo
     * @param pseudo
     * @return user
     */
    User findUserbyPseudo(String pseudo) {
        User user = Ebean.find(User.class)
                .where().eq("user_pseudo", pseudo)
                .findOne();
        return user;
    }
}