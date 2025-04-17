package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.models.ProjectDto;
import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.modules.StatusTable;
import com.pma.ProjectManagementApp.services.ProjectService;
import com.pma.ProjectManagementApp.services.StatusTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling Project related HTTP requests.
 */
@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired
    private ProjectService service;

    @Autowired
    private StatusTableService tableService;

    /**
     * Retrieves all projects.
     *
     * @return List of all ProjectDto objects.
     */
    @GetMapping
    public List<ProjectDto> getProjects() {
        return service.getProjects();
    }

    /**
     * Retrieves projects by workspace ID.
     *
     * @param workspaceID ID of the workspace for which projects are to be retrieved.
     * @return List of ProjectDto objects for the specified workspace.
     */
    @GetMapping("/{workspaceID}")
    public List<ProjectDto> getProjectsByWorkspaceID(@PathVariable Integer workspaceID) {
        return service.getProjectsByWorkspaces(workspaceID);
    }

    /**
     * Adds a new project.
     *
     * @param projectDto ProjectDto object containing details of the new project.
     * @return Newly added Project object.
     */
    @PostMapping
    public Project addProject(@RequestBody ProjectDto projectDto) {
        return service.addProject(projectDto);
    }

    /**
     * Edits an existing project.
     *
     * @param id        ID of the project to be edited.
     * @param newProject Updated Project object with new details.
     * @return Updated Project object.
     */
    @PutMapping
    public Project editProject(@RequestParam Integer id, @RequestBody Project newProject) {
        return service.editProject(id, newProject);
    }

    /**
     * Deletes a project by ID.
     *
     * @param id ID of the project to be deleted.
     */
    @DeleteMapping
    public void deleteProject(@RequestParam Integer id) {
        service.deleteProjectById(id);
    }

    /**
     * Edits a board (StatusTable) within a project.
     *
     * @param tableID ID of the board (StatusTable) to be edited.
     * @param newTable Updated StatusTable object with new details.
     */
    @PutMapping("/{tableID}/boards")
    public void editBoard(@PathVariable Integer tableID, @RequestBody StatusTable newTable) {
        tableService.editStatusTable(tableID, newTable);
    }

    /**
     * Adds a new board (StatusTable) to a project.
     *
     * @param tableID  ID of the project to which the new board will be added.
     * @param newTable StatusTable object containing details of the new board.
     */
    @PostMapping("/{tableID}/boards")
    public void addBoard(@PathVariable Integer tableID, @RequestBody StatusTable newTable) {
        service.addNewTableAndUpdateProject(tableID, newTable);
    }

    /**
     * Deletes a board (StatusTable) from a project.
     *
     * @param tableID ID of the board (StatusTable) to be deleted.
     */
    @DeleteMapping("/{tableID}/boards")
    public void deleteBoard(@PathVariable Integer tableID) {
        tableService.deleteStatusTableById(tableID);
    }
}
