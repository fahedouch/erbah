package com.controllers;

import javax.inject.Inject;

import play.filters.csrf.CSRF;
import play.mvc.Controller;
import play.mvc.Result;
import com.typesafe.config.Config;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.io.UnsupportedEncodingException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;
import com.services.UserService;

/**
 * @author DORGAA FAHED
 * Date: 27/05/2018
 * Time: 17:13
 */
public class AuthentificationContoller extends Controller {

    @Inject
    private Config config;

    private UserService userService = new UserService();

    /**
     * Return the CSRF token required by the front.
     */
    public Result getCsrfToken() {
        if (CSRF.getToken(Controller.request()) != null) {
            return ok(CSRF.getToken(Controller.request()).get().value().toString());
        } else {
            return ok("CSRF Token error");
        }
    }

    /**
     * generate JWT signed Token
     *
     * @return JWT signed Token
     * @throws UnsupportedEncodingException
     */
    public Result generateSignedToken() throws UnsupportedEncodingException {
        return ok("signed token: " + getSignedToken(5l));
    }

    /**
     * login action
     *
     * @return login response
     * @throws UnsupportedEncodingException
     */
    public Result login() throws UnsupportedEncodingException {
        JsonNode body = request().body().asJson();
        ObjectNode result = Json.newObject();

        if (body == null) {
            return ok(result.put("jwt_token", false));
        }

        if (body.hasNonNull("pseudo") &&
                body.hasNonNull("password") &&
                (this.userService.findUserbyPseudo(body.get("pseudo").asText()) != null) &&
                (this.userService.findUserbyPseudo(body.get("pseudo").asText()).getUserPassword().equals(body.get("password").asText()))) {

            this.userService.updateUserConnectionStatus(body.get("pseudo").asText() , 1);
            result.put("jwt_token", getSignedToken(new Long(this.userService.findUserbyPseudo(body.get("pseudo").asText()).getId().getUserId())));
            //TO DO put in token list of connected people
            return ok(result);
        }

        return ok(result.put("jwt_token", false));
    }

    /**
     * get Signed Token
     *
     * @param userId
     * @return JWT signed Token
     * @throws UnsupportedEncodingException
     */
    private String getSignedToken(Long userId) throws UnsupportedEncodingException {
        String secret = config.getString("play.http.secret.key");

        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withIssuer("ThePlayApp")
                .withClaim("user_id", userId)
                .sign(algorithm);
    }

    private void updateUserConnectionStatus(){
        JsonNode body = request().body().asJson();

    }


}
