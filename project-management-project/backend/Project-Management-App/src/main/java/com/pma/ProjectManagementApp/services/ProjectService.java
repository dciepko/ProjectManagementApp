package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.repos.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepo projectRepo;

    public List<Project> getProjects(){
    return projectRepo.findAll();}

    public Project addProject(Project project){
        Project addedProject = projectRepo.save(project);
        return addedProject;
    }

    public Project editProject(Integer id, Project newProject){
        Project editedProject = projectRepo.findById(id).get();
        if(editedProject != null){
            editedProject.setProjectID(newProject.getProjectID());
            editedProject.setProjectName(newProject.getProjectName());
            editedProject.setProjectDescription(newProject.getProjectDescription());
            editedProject.setStartDate(newProject.getStartDate());
            editedProject.setEndDate(newProject.getEndDate());
            editedProject.setOwnerID(newProject.getOwnerID());
            editedProject.setActivitiesPr(newProject.getActivitiesPr());
            editedProject.setTeam(newProject.getTeam());
            editedProject.setTable(newProject.getTable());
            editedProject.setUsers(newProject.getUsers());

            projectRepo.save(editedProject);

            return editedProject;
        }
        return null;
    }

    public void deleteProject(Integer id){
        if(!projectRepo.findById(id).isEmpty()){
            projectRepo.deleteById(id);
        }
        else {
            System.out.println("Not found");
        }
    }
}