package com.dallin.userservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("token-service")
@org.springframework.context.annotation.Configuration
public class TokenConfig {
    private String baseurl;

    public String getBaseurl() {
        return this.baseurl;
    }

    public void setBaseurl(String baseurl) {
        this.baseurl = baseurl;
    }
}
