package com.dallin.brainstormservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("dbconnection")
@org.springframework.context.annotation.Configuration
public class DBConfiguration {
    private String url;
    private String username;
    private String password;
    private String baseurl;

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
