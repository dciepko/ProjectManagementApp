package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.models.ProjectDto;
import com.pma.ProjectManagementApp.models.WorkspaceDto;
import com.pma.ProjectManagementApp.modules.*;
import com.pma.ProjectManagementApp.repos.ProjectRepo;
import com.pma.ProjectManagementApp.repos.UserRepo;
import com.pma.ProjectManagementApp.repos.WorkspaceRepo;
import jakarta.transaction.Transactional;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class WorkspaceService {
    @Autowired
    private WorkspaceRepo repo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ProjectRepo projectRepo;
    @Autowired
    private ProjectService projectService;

    public List<WorkspaceDto> getWorkspaces(Integer userID) {
        List<Workspace> workspaces =  repo.findByOwnerID(userID);
        return workspaces.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public void addWorkspace(WorkspaceDto newWorkspace) {

        Workspace workspace = convertToWorkspace(newWorkspace);

        Workspace savedWorkspace = repo.save(workspace);

        List<Integer> usersIDs = newWorkspace.getUserIDs();
        List<User> users = userRepo.findAllById(usersIDs);

        for(User user : users) {
            user.getWorkspacesU().add(savedWorkspace);
            userRepo.save(user);
        }
        repo.save(savedWorkspace);
    }

    @Transactional
    public void deleteWorkspaceById(Integer workspaceID) {
        Workspace workspace = repo.findById(workspaceID).orElseThrow(() -> new IllegalArgumentException("StatusTable with ID " + workspaceID + " does not exist"));

        List<Project> projects = workspace.getWsProjects();

        if (projects != null && !projects.isEmpty()) {
            List<Project> projectsCopy = new ArrayList<>(projects);
            for (Project project : projectsCopy) {
                activityService.deleteActivityById(activity.getActivityID());
            }
        }

        User project = statusTable.getProject();
        if (project != null){
            project.getTables().remove(statusTable);
            projectRepo.save(project);
        }

        repo.deleteById(tableID);
    }

    private WorkspaceDto convertToDto(Workspace workspace) {
        WorkspaceDto dto = new WorkspaceDto();
        dto.setWorkspaceID(workspace.getWorkspaceID());
        dto.setWorkspaceName(workspace.getWorkspaceName());
        dto.setWorkspaceDescription(workspace.getWsDescription());
        dto.setLogo(workspace.getLogo());
        dto.setOwnerID(workspace.getOwnerID());

        dto.setUserIDs(workspace.getUsers().stream().map(User::getUserID).collect(Collectors.toList()));
        dto.setProjectsIDs(workspace.getWsProjects().stream().map(Project::getProjectID).collect(Collectors.toList()));

        return dto;
    }

    private Workspace convertToWorkspace(WorkspaceDto workspaceDto) {
        Workspace workspace = new Workspace();
        workspace.setWorkspaceName(workspaceDto.getWorkspaceName());
        workspace.setWsDescription(workspaceDto.getWorkspaceDescription());
        workspace.setLogo(workspaceDto.getLogo());
        workspace.setOwnerID(workspaceDto.getOwnerID());

        List<User> users = workspaceDto.getUserIDs().stream()
                .map(userId -> userRepo.findById(userId).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        workspace.setUsers(users);
        List<Project> projects = workspaceDto.getProjectsIDs().stream()
                .map(projectID -> projectRepo.findById(projectID).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        workspace.setWsProjects(projects);

        return workspace;
    }
}
