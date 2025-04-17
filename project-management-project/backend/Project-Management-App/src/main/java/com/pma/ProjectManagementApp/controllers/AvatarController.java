package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.modules.Avatar;
import com.pma.ProjectManagementApp.services.AvatarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller class for handling Avatar related HTTP requests.
 */
@RestController
public class AvatarController {
    @Autowired
    private AvatarService service;

    /**
     * Endpoint to retrieve all avatars.
     *
     * @return List of Avatar objects representing all avatars.
     */
    @GetMapping("/avatars")
    public List<Avatar> getAvatars() {
        return service.getAll();
    }
}
