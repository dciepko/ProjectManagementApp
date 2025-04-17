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

/**
 * Service class that handles business logic related to projects.
 */
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

    @Autowired
    private StatusTableService statusTableService;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private NotificationRepo notificationRepo;

    /**
     * Retrieves all projects.
     *
     * @return List of ProjectDto objects representing all projects
     */
    public List<ProjectDto> getProjects(){
        List<Project> projects = projectRepo.findAll();
        return projects.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves projects associated with a specific workspace.
     *
     * @param id ID of the workspace
     * @return List of ProjectDto objects representing projects in the specified workspace
     */
    public List<ProjectDto> getProjectsByWorkspaces(Integer id){
        List<Project> projects = projectRepo.findByWorkspaceWorkspaceID(id);
        return projects.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Adds a new project.
     *
     * @param projectDto ProjectDto object containing project details
     * @return Project object representing the newly added project
     */
    @Transactional
    public Project addProject(ProjectDto projectDto){
        Project project = convertToProject(projectDto);

        Project savedProject = projectRepo.save(project);

        List<User> users = userRepo.findAllById(projectDto.getUserIds());

        for(User user : users) {
            user.getProjectsU().add(savedProject);
            userRepo.save(user);

            Notification newNotification = new Notification();
            newNotification.setNotificationDate(project.getEndDate());
            newNotification.setUserNotification(user);
            newNotification.setNotificationContent("Zostałeś dodany do projektu '" + project.getProjectName() + "'");
            newNotification.setIsRead(false);
            notificationRepo.save(newNotification);
        }

        StatusTable table1 = new StatusTable();
        table1.setTableName("Do zrobienia");
        table1.setTableColor("blue");
        table1.setProject(savedProject);

        StatusTable table2 = new StatusTable();
        table2.setTableName("W trakcie");
        table2.setTableColor("blue");
        table2.setProject(savedProject);

        StatusTable table3 = new StatusTable();
        table3.setTableName("Zakończone");
        table3.setTableColor("blue");
        table3.setProject(savedProject);

        List<StatusTable> projectTables = new ArrayList<>();
        projectTables.add(table1);
        projectTables.add(table2);
        projectTables.add(table3);

        // Save status tables after assigning them to the project
        tableRepo.saveAll(projectTables);

        // Assign saved status tables to the project
        savedProject.setTables(projectTables);

        // Save project again with assigned tables
        return projectRepo.save(savedProject);
    }

    /**
     * Adds a new status table to a project and updates the project.
     *
     * @param projectID ID of the project to which the new status table will be added
     * @param newTable StatusTable object representing the new table to be added
     */
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

    /**
     * Edits an existing project.
     *
     * @param id ID of the project to be edited
     * @param newProject Project object containing updated project details
     * @return Project object representing the edited project
     */
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

    /**
     * Deletes a project by its ID.
     *
     * @param id ID of the project to be deleted
     */
    public void deleteProject(Integer id){
        if(!projectRepo.findById(id).isEmpty()){
            projectRepo.deleteById(id);
        }
        else {
            System.out.println("Not found");
        }
    }

    /**
     * Converts a Project entity to ProjectDto.
     *
     * @param project Project entity to be converted
     * @return ProjectDto object representing the converted project
     */
    private ProjectDto convertToDto(Project project) {
        ProjectDto dto = new ProjectDto();
        dto.setProjectID(project.getProjectID());
        dto.setProjectName(project.getProjectName());
        dto.setProjectDescription(project.getProjectDescription());
        dto.setStartDate(project.getStartDate());
        dto.setEndDate(project.getEndDate());
        dto.setOwnerID(project.getOwnerID());

        dto.setUserIds(project.getUsers().stream().map(User::getUserID).collect(Collectors.toList()));
        dto.setActivityIds(project.getProjectActivities().stream().map(Activity::getActivityID).collect(Collectors.toList()));
        dto.setTables(project.getTables());
        dto.setTeamIds(project.getTeams().stream().map(Team::getTeamID).collect(Collectors.toList()));
        dto.setStatusId(project.getStatus().getStatusID());
        dto.setWorkspaceID(project.getWorkspace().getWorkspaceID());
        return dto;
    }

    /**
     * Converts ProjectDto to Project entity.
     *
     * @param projectDto ProjectDto object to be converted
     * @return Project entity representing the converted project
     */
    public Project convertToProject(ProjectDto projectDto) {
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

    /**
     * Deletes a project by its ID, handling associated entities.
     * This method performs cascading deletion of associated entities such as status tables, activities, users, teams,
     * and updates corresponding repositories.
     *
     * @param projectID ID of the project to be deleted
     */
    @Transactional
    public void deleteProjectById(Integer projectID){
        Project project = projectRepo.findByProjectID(projectID);

        Status status = project.getStatus();
        if (status != null){
            status.getProjects().remove(project);
            statusRepo.save(status);
        }

        Workspace workspace = project.getWorkspace();
        if (workspace != null){
            workspace.getWsProjects().remove(project);
            workspaceRepo.save(workspace);
        }

        List<StatusTable> tables = project.getTables();

        if (tables != null && !tables.isEmpty()) {
            List<StatusTable> tablesCopy = new ArrayList<>(tables);
            for (StatusTable table : tablesCopy) {
                statusTableService.deleteStatusTableById(table.getTableID());
            }
        }

        List<Activity> activities = project.getProjectActivities();

        if (activities != null && !activities.isEmpty()) {
            List<Activity> activitiesCopy = new ArrayList<>(activities);
            for (Activity activity : activitiesCopy) {
                activityService.deleteActivityById(activity.getActivityID());
            }
        }

        List<User> users = project.getUsers();
        if (users != null && !users.isEmpty()) {
            for (User user : users) {
                user.getProjectsU().remove(project);
                userRepo.save(user);
            }
            project.getUsers().clear();
            projectRepo.save(project);
        }

        List<Team> teams = project.getTeams();
        if (teams != null && !teams.isEmpty()) {
            for (Team team : teams) {
                team.getProjectsTeam().remove(project);
                teamRepo.save(team);
            }
            project.getUsers().clear();
            projectRepo.save(project);
        }

        projectRepo.deleteById(projectID);
    }
}