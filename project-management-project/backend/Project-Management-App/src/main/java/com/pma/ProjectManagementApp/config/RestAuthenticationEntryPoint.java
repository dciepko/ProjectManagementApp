package com.pma.ProjectManagementApp.config;

import java.io.IOException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * Custom authentication entry point for handling unauthorized requests.
 */
@Component
public final class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    /**
     * Invoked when an unauthenticated user requests a secured HTTP resource.
     *
     * @param request       HTTP request made by the client
     * @param response      HTTP response to send to the client
     * @param authException AuthenticationException that occurred
     * @throws IOException if an input or output exception occurs
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}
