package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.models.AuthenticationResponse;
import com.pma.ProjectManagementApp.modules.User;
import com.pma.ProjectManagementApp.repos.UserRepo;
import jakarta.servlet.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
        user.setIsOwner(request.getIsOwner());
        user.setWorkingHours(request.getWorkingHours());
        user.setUserPassword(passwordEncoder.encode(request.getUserPassword()));

        user.setRole(request.getRole());
        user = repository.save(user);
        System.out.println("service");
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(User request) {
        System.out.println("service");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserNickname(),
                        request.getPassword()
                )
        );
        User user = repository.findByUserNickname(request.getUserNickname());
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }
}
