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

    @ManyToMany(mappedBy = "projectsA")
    @JsonIgnore
    private List<Activity> activitiesPr;

    @ManyToOne
    @JoinColumn(name = "teamID")
    @JsonIgnore
    private Team team;

    @ManyToOne
    @JoinColumn(name = "statusID")
    @JsonIgnore
    private Status status;

    @ManyToOne
    @JoinColumn(name = "tableID")
    @JsonIgnore
    private StatusTable table;
}