package com.project2.secutity;

public class SecurityConstants {
    static final String SECRET = "phong_qua_ba";
    static final long EXPIRATION_TIME = 864_000_000; // 10 days
    static final String TOKEN_PREFIX = "phong ";
    static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/users/sign-up";
}
