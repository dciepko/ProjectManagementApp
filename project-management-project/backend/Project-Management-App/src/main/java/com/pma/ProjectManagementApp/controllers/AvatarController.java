package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.modules.Avatar;
import com.pma.ProjectManagementApp.services.AvatarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AvatarController {
    @Autowired
    private AvatarService service;
    @GetMapping("/avatars")
    public List<Avatar> getAvatars() {
        return service.getAll();
    }
}
