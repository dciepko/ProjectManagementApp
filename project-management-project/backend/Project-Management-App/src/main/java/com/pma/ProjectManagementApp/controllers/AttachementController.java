package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.modules.Attachement;
import com.pma.ProjectManagementApp.services.AttachementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AttachementController {
    @Autowired
    private AttachementService service;

    @GetMapping("/attachements")
    private List<Attachement> getAttachements() {
        return service.getAll();
    }
}
