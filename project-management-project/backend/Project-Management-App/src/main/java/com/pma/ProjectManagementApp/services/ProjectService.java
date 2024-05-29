package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.models.ProjectDto;
import com.pma.ProjectManagementApp.modules.*;
import com.pma.ProjectManagementApp.repos.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepo projectRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private TeamRepo teamRepo;
    @Autowired
    private ActivityRepo activityRepo;
    @Autowired
    private StatusRepo statusRepo;
    @Autowired
    private StatusTableRepo tableRepo;
    @Autowired
    private WorkspaceRepo workspaceRepo;

    public List<ProjectDto> getProjects(){
        List<Project> projects = projectRepo.findAll();
        return projects.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public Project addProject(ProjectDto projectDto){
        Project project = convertToProject(projectDto);

        StatusTable table1 = new StatusTable();
        table1.setTableName("Do zrobienia");
        table1.setTableColor("blue");
        table1.setProject(project);
        tableRepo.save(table1);
        StatusTable table2 = new StatusTable();
        table2.setTableName("W trakcie");
        table2.setTableColor("blue");
        table2.setProject(project);
        tableRepo.save(table2);
        StatusTable table3 = new StatusTable();
        table3.setTableName("Zakończone");
        table3.setTableColor("blue");
        table3.setProject(project);
        tableRepo.save(table3);
        List<StatusTable> projectTables = new ArrayList<>();
        projectTables.add(table1);
        projectTables.add(table2);
        projectTables.add(table3);
        project.setTables(projectTables);

        Project addedProject = projectRepo.save(project);
        return addedProject;
    }

    @Transactional
    public void addNewTableAndUpdateProject(Integer projectID, StatusTable newTable) {
        Project project = projectRepo.findById(projectID).get();

        StatusTable table = new StatusTable();
        table.setTableName(newTable.getTableName());
        table.setTableColor(newTable.getTableColor());
        table.setProject(project);

        tableRepo.save(table);

        List<StatusTable> projectTables = project.getTables();
        projectTables.add(table);
        project.setTables(projectTables);
        projectRepo.save(project);
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
            editedProject.setTables(newProject.getTables());
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
        dto.setTables(project.getTables());
        dto.setTeamIds(project.getTeams().stream().map(Team::getTeamID).collect(Collectors.toList()));
        dto.setStatusId(project.getStatus().getStatusID());
        dto.setWorkspaceID(project.getWorkspace().getWorkspaceID());
        return dto;
    }

    private Project convertToProject(ProjectDto projectDto) {
        Project project = new Project();
        project.setProjectName(projectDto.getProjectName());
        project.setProjectDescription(projectDto.getProjectDescription());
        project.setStartDate(projectDto.getStartDate());
        project.setEndDate(projectDto.getEndDate());
        project.setOwnerID(projectDto.getOwnerID());
        project.setTables(projectDto.getTables());

        List<User> users = projectDto.getUserIds().stream()
                .map(userId -> userRepo.findById(userId).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        project.setUsers(users);
        List<Activity> activities = projectDto.getActivityIds().stream()
                .map(userId -> activityRepo.findById(userId).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        project.setProjectActivities(activities);
        List<Team> teams = projectDto.getTeamIds().stream()
                .map(userId -> teamRepo.findById(userId).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        project.setTeams(teams);
        Status status = statusRepo.findById(projectDto.getStatusId()).orElse(null);
        project.setStatus(status);
        Workspace workspace = workspaceRepo.findById(projectDto.getWorkspaceID()).orElse(null);
        project.setWorkspace(workspace);

        return project;
    }

}