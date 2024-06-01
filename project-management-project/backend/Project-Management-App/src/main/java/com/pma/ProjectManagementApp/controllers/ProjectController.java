package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.models.ProjectDto;
import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.modules.StatusTable;
import com.pma.ProjectManagementApp.services.ProjectService;
import com.pma.ProjectManagementApp.services.StatusTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired
    private ProjectService service;
    @Autowired
    private StatusTableService tableService;

    @GetMapping
    public List<ProjectDto> getProjects(){
        System.out.println("weszlo do controllera");
        return service.getProjects();
    }

    @PostMapping
    public Project addProject(@RequestBody ProjectDto projectDto){
        return service.addProject(projectDto);
    }

    @PutMapping
    public Project editProject(@RequestParam Integer id, @RequestBody Project newProject){
        return service.editProject(id, newProject);
    }

    @DeleteMapping
    public void deleteProject(@RequestParam Integer id){
        service.deleteProject(id);
    }

    @PutMapping("/{tableID}/boards")
    public void editBoard(@PathVariable Integer tableID, @RequestBody StatusTable newTable) {
        System.out.println("weszlo do controllera");
        tableService.editStatusTable(tableID, newTable);
    }

    @PostMapping("/{tableID}/boards")
    public void addBoard(@PathVariable Integer tableID, @RequestBody StatusTable newTable) {
        System.out.println("weszlo do controllera");
        service.addNewTableAndUpdateProject(tableID, newTable);
    }

}