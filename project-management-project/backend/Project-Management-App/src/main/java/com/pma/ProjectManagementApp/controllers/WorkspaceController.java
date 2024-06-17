package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.modules.Workspace;
import com.pma.ProjectManagementApp.services.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WorkspaceController {
    @Autowired
    private WorkspaceService service;

    @GetMapping("/workspaces")
    public List<Workspace> getProjects(){
        return service.getWorkspaces();
    }
    @PostMapping("/workspaces")
    public void addWorkspace(@RequestBody Workspace newWorkspace) {
        service.addWorkspace(newWorkspace);
    }
}
