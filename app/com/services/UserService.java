package com.services;

import com.models.User;
/**
 * @author DORGAA FAHED
 * Date: 10/06/2018
 * Time: 18:17
 */
public class UserService {

    private UserDao userDao = new UserDao();

    /**
     * find User by Pseudo
     * @param pseudo
     * @return user
     */
    public User findUserbyPseudo(String pseudo){
       return  userDao.findUserbyPseudo(pseudo);
    }

}
