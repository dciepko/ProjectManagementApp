package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProjectController {
    @Autowired
    private ProjectService service;

    @GetMapping("/projects")
    public List<Project> getProjects(){
        return service.getProjects();
    }

    @PostMapping("/projects")
    public Project addProject(@RequestBody Project project){
        return service.addProject(project);
    }

    @PutMapping("/projects")
    public Project editProject(@RequestParam Integer id, @RequestBody Project newProject){
        return service.editProject(id, newProject);
    }

    @DeleteMapping("/projects")
    public void deleteProject(@RequestParam Integer id){
        service.deleteProject(id);
    }
}