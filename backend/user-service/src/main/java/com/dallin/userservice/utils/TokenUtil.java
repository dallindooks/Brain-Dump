package com.dallin.userservice.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.dallin.userservice.config.TokenConfig;

@RestController
public class TokenUtil {

    @Autowired
    TokenConfig configuration;

    public String getNewToken(String username) {
        RestTemplate restTemplate = new RestTemplate();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        
        String url = configuration.getBaseurl() + "new-token-" + username;
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        
        String responseBody = responseEntity.getBody();
        return responseBody;
    }

    public Boolean validateToken(String token, String username) {
        RestTemplate restTemplate = new RestTemplate();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("token", token);
        headers.add("username", username);
        
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        
        String url = configuration.getBaseurl() + "validate-token";
        ResponseEntity<Boolean> responseEntity = restTemplate.exchange(url, HttpMethod.GET, requestEntity, Boolean.class);
        
        Boolean responseBody = responseEntity.getBody();
        return responseBody;
    }


}
