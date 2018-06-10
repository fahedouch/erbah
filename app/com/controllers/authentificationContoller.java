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


/**
 * @author DORGAA FAHED
 * Date: 27/05/2018
 * Time: 17:13
 */
public class authentificationContoller extends Controller {

    @Inject
    private Config config;

    /**
     * Return the CSRF token required by the front.
     */
    public Result getCsrfToken() {
        if (CSRF.getToken(Controller.request()) != null) {
            return ok(CSRF.getToken(Controller.request()).get().value());
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

        if (body.hasNonNull("username") && body.hasNonNull("password") && body.get("username").asText().equals("fahedouch")) {
            result.put("jwt_token", getSignedToken(7l));
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


}
