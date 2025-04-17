package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

/**
 * Service class responsible for JWT token generation, validation, and extraction operations.
 */
@Service
public class JwtService {
    private final String SECRET_KEY = "1f16ae24ccd3848c16d3c575c0fbc9d27c629a585c607fa89c76135b0193ffcf";

    /**
     * Extracts the username (subject) from the JWT token.
     *
     * @param token JWT token from which to extract the username
     * @return Username extracted from the token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Validates if a given JWT token is valid for the specified user.
     *
     * @param token JWT token to validate
     * @param user UserDetails object representing the user
     * @return true if the token is valid for the user, false otherwise
     */
    public boolean isValid(String token, UserDetails user) {
        String userName = extractUsername(token);
        return (userName.equals(user.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extracts a specific claim (attribute) from the JWT token.
     *
     * @param token    JWT token from which to extract the claim
     * @param resolver Function to resolve the desired claim from Claims object
     * @param <T>      Type of the claim to be extracted
     * @return Extracted claim value
     */
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Generates a JWT token for a given user.
     *
     * @param user User object for which to generate the token
     * @return Generated JWT token
     */
    public String generateToken(User user) {
        String token = Jwts
                .builder()
                .subject(user.getUserNickname())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) // Token validity: 24 hours
                .signWith(getSigningKey())
                .compact();
        return token;
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
