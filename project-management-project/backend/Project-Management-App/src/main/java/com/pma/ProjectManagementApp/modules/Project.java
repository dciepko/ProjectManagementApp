package com.pma.ProjectManagementApp.modules;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer projectID;
    private String projectName;
    private String projectDescription;
    private Date startDate;
    private Date endDate;
    private Integer ownerID;

    @ManyToMany(mappedBy = "projectsU")
    @JsonIgnore
    private List<User> users;

    @ManyToMany(mappedBy = "projectsTeam")
    @JsonIgnore
    private List<Team> teams;

    @ManyToOne
    @JoinColumn(
            name = "statusID")
    @JsonIgnore
    private Status status;


    @OneToMany(mappedBy = "project")
    @JsonIgnore
    private List<StatusTable> tables;

    @ManyToOne
    @JoinColumn(name = "workspaceID")
    private Workspace workspace;

    @OneToMany(mappedBy = "activityProject")
    @JsonIgnore
    private List<Activity> projectActivities;
}