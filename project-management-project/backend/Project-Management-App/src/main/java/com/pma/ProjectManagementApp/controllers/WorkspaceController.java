package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.models.WorkspaceDto;
import com.pma.ProjectManagementApp.services.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling Workspace related HTTP requests.
 */
@RestController
public class WorkspaceController {
    @Autowired
    private WorkspaceService service;

    /**
     * Retrieves workspaces for a specific user.
     *
     * @param userID Integer ID of the user whose workspaces are to be retrieved.
     * @return List of WorkspaceDto objects representing the user's workspaces.
     */
    @GetMapping("/workspaces/{userID}")
    public List<WorkspaceDto> getWorkspaces(@PathVariable Integer userID) {
        return service.getWorkspaces(userID);
    }

    /**
     * Adds a new workspace.
     *
     * @param newWorkspace WorkspaceDto object containing details of the new workspace.
     */
    @PostMapping("/workspaces")
    public void addWorkspace(@RequestBody WorkspaceDto newWorkspace) {
        service.addWorkspace(newWorkspace);
    }

    /**
     * Deletes a workspace.
     *
     * @param workspaceID Integer ID of the workspace to delete.
     */
    @DeleteMapping("/workspaces/{workspaceID}")
    public void deleteWorkspace(@PathVariable Integer workspaceID) {
        service.deleteWorkspaceById(workspaceID);
    }
}
