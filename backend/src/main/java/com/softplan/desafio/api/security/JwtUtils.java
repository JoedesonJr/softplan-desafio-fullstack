package com.softplan.desafio.api.security;

import com.softplan.desafio.api.model.User;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Component
public class JwtUtils {

    @Value("${app.jwtSignature}")
    private String SIGNATURE;

    @Value("${app.jwtExpiration}")
    private int EXPIRATION;

    public String generateToken(User user) {
        return Jwts.builder()
                .claim("id", user.getId())
                .claim("username", user.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SIGNATURE)
            .compact();
    }

    public String getUsernameToken(String token) {
        if (StringUtils.hasText(token)) {
            Claims claims = parserToken(token);
            if (claims != null) {
                return claims.get("username").toString();
            }
        }
        return null;
    }

    public boolean isTokenValid(String token, HttpServletRequest request) {
        try {
            Jwts.parser().setSigningKey(SIGNATURE).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException ex) {
            request.setAttribute("expired", ex.getMessage());
        }
        return false;
    }

    public Claims parserToken(String token) {
        return Jwts.parser()
                .setSigningKey(SIGNATURE)
                .parseClaimsJws(token)
            .getBody();
    }

}