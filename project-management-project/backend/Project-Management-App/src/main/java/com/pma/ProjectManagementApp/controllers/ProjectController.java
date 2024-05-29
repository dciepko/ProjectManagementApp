package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.models.ProjectDto;
import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.modules.StatusTable;
import com.pma.ProjectManagementApp.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired
    private ProjectService service;

    @GetMapping
    public List<ProjectDto> getProjects(){
        return service.getProjects();
    }

    @PostMapping
    public Project addProject(@RequestBody ProjectDto projectDto){
        return service.addProject(projectDto);
    }

    @PostMapping("/{projectID}/boards")
    public void addPost(@PathVariable Integer projectID, @RequestBody StatusTable newTable) {
        service.addNewTableAndUpdateProject(projectID, newTable);
    }

    @PutMapping
    public Project editProject(@RequestParam Integer id, @RequestBody Project newProject){
        return service.editProject(id, newProject);
    }

    @DeleteMapping
    public void deleteProject(@RequestParam Integer id){
        service.deleteProject(id);
    }
}