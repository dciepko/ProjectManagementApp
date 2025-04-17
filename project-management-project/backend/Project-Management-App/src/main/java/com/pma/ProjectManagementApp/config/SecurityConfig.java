package com.pma.ProjectManagementApp.config;

import com.pma.ProjectManagementApp.filters.JwtAuthenticationFilter;
import com.pma.ProjectManagementApp.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuration class for Spring Security settings in the application.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final UserService userDetailsServiceImp;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Constructor for SecurityConfig class.
     *
     * @param userDetailsServiceImp   UserDetailsService implementation for user details management
     * @param jwtAuthenticationFilter JWT authentication filter
     */
    public SecurityConfig(UserService userDetailsServiceImp,
                          JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsServiceImp = userDetailsServiceImp;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /**
     * Configures the security filter chain.
     *
     * @param http HttpSecurity object for configuring HTTP security
     * @return SecurityFilterChain configured security filter chain
     * @throws Exception if there is an error during security configuration
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF protection
                .authorizeHttpRequests(
                        req -> req
                                .requestMatchers(HttpMethod.GET, "/avatars").hasAnyRole("ADMIN") // Allow access to /avatars only for ADMIN role
                                .requestMatchers(HttpMethod.GET, "/attachements").hasAnyRole("ADMIN") // Allow access to /attachements only for ADMIN role
                                .requestMatchers("/login/**", "/register/**").permitAll() // Allow access to /login/** and /register/** for all users
                                .anyRequest().authenticated() // Require authentication for all other requests
                )
                .userDetailsService(userDetailsServiceImp) // Set the UserDetailsService for user details management
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Set session management policy to stateless
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // Add JWT authentication filter before UsernamePasswordAuthenticationFilter
                .build();
    }

    /**
     * Bean for password encoder.
     *
     * @return PasswordEncoder for password encoding
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Bean for authentication manager.
     *
     * @param configuration Authentication configuration
     * @return AuthenticationManager for managing authentication
     * @throws Exception if there is an error obtaining the authentication manager
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
