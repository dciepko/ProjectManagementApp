package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.modules.Attachement;
import com.pma.ProjectManagementApp.services.AttachementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller class for handling HTTP requests related to attachments.
 */
@RestController
public class AttachementController {
    @Autowired
    private AttachementService service;

    /**
     * Endpoint to retrieve all attachments.
     *
     * @return List of Attachement objects representing attachments
     */
    @GetMapping("/attachments")
    private List<Attachement> getAttachments() {
        return service.getAll();
    }
}
