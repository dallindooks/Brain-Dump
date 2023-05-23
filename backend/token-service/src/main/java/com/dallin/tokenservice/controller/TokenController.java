package com.dallin.tokenservice.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dallin.tokenservice.util.JwtUtil;


@RestController
@RequestMapping("/token")
public class TokenController {
    
    @PostMapping("/new-token-{username}")
    public String getNewToken(@PathVariable String username) {
        setSecretStatic(key);
        return JwtUtil.generateToken(username, STATIC_KEY);
    }

    @GetMapping("/validate-token")
    public Boolean validateToken(@RequestHeader String token, @RequestHeader String username) {
        setSecretStatic(key);
        return JwtUtil.validateToken(token, STATIC_KEY, username);
    }

    @Value("${jwt.secretKey}")
    private String key;

    private static String STATIC_KEY;

    @Value("${jwt.secretKey}")
    public void setSecretStatic(String name){
        TokenController.STATIC_KEY = name;
    }

}
