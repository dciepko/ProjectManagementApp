package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.models.ProjectDto;
import com.pma.ProjectManagementApp.modules.Activity;
import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.modules.Team;
import com.pma.ProjectManagementApp.modules.User;
import com.pma.ProjectManagementApp.repos.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepo projectRepo;

    public List<ProjectDto> getProjects(){
        List<Project> projects = projectRepo.findAll();
        return projects.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ProjectDto convertToDto(Project project) {
        ProjectDto dto = new ProjectDto();
        dto.setProjectID(project.getProjectID());
        dto.setProjectName(project.getProjectName());
        dto.setProjectDescription(project.getProjectDescription());
        dto.setStartDate(project.getStartDate());
        dto.setEndDate(project.getEndDate());
        dto.setOwnerID(project.getOwnerID());
        // Ustawienie ID użytkowników, ID aktywności, ID zespołu, ID statusu oraz ID tabeli
        dto.setUserIds(project.getUsers().stream().map(User::getUserID).collect(Collectors.toList()));
        dto.setActivityIds(project.getProjectActivities().stream().map(Activity::getActivityID).collect(Collectors.toList()));
        dto.setTeamIds(project.getTeams().stream().map(Team::getTeamID).collect(Collectors.toList()));
        dto.setStatusId(project.getStatus().getStatusID());
        dto.setTableId(project.getTable().getTableID());
        dto.setWorkspaceID(project.getWorkspace().getWorkspaceID());
        return dto;
    }

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
            editedProject.setProjectActivities(newProject.getProjectActivities());
            editedProject.setTeams(newProject.getTeams());
            editedProject.setTable(newProject.getTable());
            editedProject.setUsers(newProject.getUsers());
            editedProject.setWorkspace(newProject.getWorkspace());

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