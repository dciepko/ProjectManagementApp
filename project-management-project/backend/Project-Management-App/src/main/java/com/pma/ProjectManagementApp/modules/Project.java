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
    private Date startDate; //TU TEZ NWM JESZCZE
    private Date endDate;

    @ManyToMany(mappedBy = "projectsU")
    private List<User> users;
    @ManyToMany(mappedBy = "projectsTeam")
    private List<Team> teams;

    @ManyToMany(mappedBy = "projectsA")
    private List<Activity> activitiesPr;

    @ManyToOne
    @JoinColumn(name = "statusID")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "tableID")
    private Table table;
}