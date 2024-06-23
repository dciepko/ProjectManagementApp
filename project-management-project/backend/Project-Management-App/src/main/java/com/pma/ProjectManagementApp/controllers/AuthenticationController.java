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

@RestController
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User request, BindingResult result) {
        if(result.hasErrors()) {
            return ResponseEntity.badRequest().body("Walidacja nieudana" + result.getAllErrors());
        }
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
