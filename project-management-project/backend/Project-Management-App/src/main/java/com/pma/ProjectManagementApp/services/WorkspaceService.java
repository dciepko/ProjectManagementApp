package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.models.ProjectDto;
import com.pma.ProjectManagementApp.models.WorkspaceDto;
import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.modules.User;
import com.pma.ProjectManagementApp.modules.Workspace;
import com.pma.ProjectManagementApp.repos.ProjectRepo;
import com.pma.ProjectManagementApp.repos.UserRepo;
import com.pma.ProjectManagementApp.repos.WorkspaceRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Service class that handles business logic related to workspaces.
 */
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

    /**
     * Retrieves all workspaces for a given user.
     *
     * @param userID ID of the user
     * @return List of WorkspaceDto objects representing the user's workspaces
     */
    public List<WorkspaceDto> getWorkspaces(Integer userID) {
        List<Workspace> workspaces = repo.findByOwnerID(userID);
        return workspaces.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Adds a new workspace.
     *
     * @param newWorkspace WorkspaceDto object representing the new workspace to add
     */
    public void addWorkspace(WorkspaceDto newWorkspace) {
        Workspace workspace = convertToWorkspace(newWorkspace);

        Workspace savedWorkspace = repo.save(workspace);

        List<Integer> usersIDs = newWorkspace.getUserIDs();
        List<User> users = userRepo.findAllById(usersIDs);

        for (User user : users) {
            user.getWorkspacesU().add(savedWorkspace);
            userRepo.save(user);
        }
    }

    /**
     * Deletes a workspace by ID.
     *
     * @param workspaceID ID of the workspace to delete
     */
    @Transactional
    public void deleteWorkspaceById(Integer workspaceID) {
        Workspace workspace = repo.findById(workspaceID)
                .orElseThrow(() -> new IllegalArgumentException("Workspace with ID " + workspaceID + " does not exist"));

        List<Project> projects = workspace.getWsProjects();

        if (projects != null && !projects.isEmpty()) {
            List<Project> projectsCopy = new ArrayList<>(projects);
            for (Project project : projectsCopy) {
                projectService.deleteProjectById(project.getProjectID());
            }
        }

        List<User> users = workspace.getUsers();
        if (users != null && !users.isEmpty()) {
            for (User user : users) {
                user.getWorkspacesU().remove(workspace);
                userRepo.save(user);
            }
        }

        repo.deleteById(workspaceID);
    }

    /**
     * Converts a Workspace entity to WorkspaceDto.
     *
     * @param workspace Workspace entity to convert
     * @return WorkspaceDto representation of the workspace
     */
    public WorkspaceDto convertToDto(Workspace workspace) {
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

    /**
     * Converts a WorkspaceDto to a Workspace entity.
     *
     * @param workspaceDto WorkspaceDto object to convert
     * @return Workspace entity representation of the WorkspaceDto
     */
    public Workspace convertToWorkspace(WorkspaceDto workspaceDto) {
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
