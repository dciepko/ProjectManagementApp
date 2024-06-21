package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.models.AuthenticationResponse;
import com.pma.ProjectManagementApp.models.Role;
import com.pma.ProjectManagementApp.modules.User;
import com.pma.ProjectManagementApp.repos.UserRepo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepo repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepo repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }


    public AuthenticationResponse register(User request) {
        User user = new User();
        user.setUserFirstName(request.getUserFirstName());
        user.setUserSurename(request.getUserSurename());
        user.setUserNickname(request.getUserNickname());
        user.setUserEmail(request.getUserEmail());

        user.setUserPassword(passwordEncoder.encode(request.getUserPassword()));

        user.setRole(
                request.getRole() != null ? request.getRole() : Role.USER
        );
        user.setIsOwner(
                request.getIsOwner() != null ? request.getIsOwner() : false
        );
        user.setWorkingHours(
                request.getWorkingHours() != null ? request.getWorkingHours() : "no schedule"
        );

        user = repository.save(user);
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token, user.getUserID());
    }

    public AuthenticationResponse authenticate(User request) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUserNickname(),
                            request.getUserPassword()
                    )
            );
        } catch (Exception e) {

            throw new RuntimeException("Authentication failed");
        }

        User user = repository.findByUserNickname(request.getUserNickname());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token, user.getUserID());
    }
}
