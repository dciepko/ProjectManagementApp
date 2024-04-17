package com.pma.ProjectManagementApp.modules;

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
    private List<User> users;

    @ManyToMany(mappedBy = "projectsA")
    private List<Activity> activitiesPr;

    @ManyToOne
    @JoinColumn(name = "teamID")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "statusID")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "tableID")
    private StatusTable table;
}