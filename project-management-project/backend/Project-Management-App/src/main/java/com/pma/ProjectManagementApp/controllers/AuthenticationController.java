package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.models.AuthenticationResponse;
import com.pma.ProjectManagementApp.modules.User;
import com.pma.ProjectManagementApp.services.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class for handling user authentication related HTTP requests.
 */
@RestController
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    /**
     * Constructor to initialize the AuthenticationController with an AuthenticationService instance.
     *
     * @param authenticationService The service responsible for handling authentication operations.
     */
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    /**
     * Endpoint for user registration.
     *
     * @param request The User object containing registration details.
     * @param result  The BindingResult object to capture validation errors.
     * @return ResponseEntity containing either a success message or validation errors.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User request, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation failed: " + result.getAllErrors());
        }
        return ResponseEntity.ok(authenticationService.register(request));
    }

    /**
     * Endpoint for user login.
     *
     * @param request The User object containing login credentials.
     * @return ResponseEntity containing an AuthenticationResponse object upon successful authentication.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
