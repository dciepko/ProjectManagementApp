package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.models.WorkspaceDto;
import com.pma.ProjectManagementApp.modules.Workspace;
import com.pma.ProjectManagementApp.services.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WorkspaceController {
    @Autowired
    private WorkspaceService service;

    @GetMapping("/workspaces/{userID}")
    public List<WorkspaceDto> getProjects(@PathVariable Integer userID){
        return service.getWorkspaces(userID);
    }
    @PostMapping("/workspaces")
    public void addWorkspace(@RequestBody WorkspaceDto newWorkspace) {
        service.addWorkspace(newWorkspace);
    }
}
