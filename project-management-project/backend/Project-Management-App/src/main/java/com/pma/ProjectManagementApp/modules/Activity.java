package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer activityID;
    private String activityName;
    private String activityDescription; //TU TEZ STRING?
    private Date dueDate; //DATE?
    private Integer activityType;
    private Integer activityPriority;

    @ManyToOne
    @JoinColumn(name = "tableID")
    private StatusTable tableA;

    @ManyToOne
    @JoinColumn(name = "labelID")
    private Label labelA;

    @ManyToOne
    @JoinColumn(name = "statusID")
    private Status activitiesStatus;

    @ManyToMany
    @JoinTable(
            name = "activity_project",
            joinColumns = @JoinColumn(name = "activityID"),
            inverseJoinColumns = @JoinColumn(name = "projectID")
    )
    private List<Project> projectsA;

    @ManyToMany(mappedBy = "activitiesUser")
    private List<User> usersActivity;

    @OneToMany(mappedBy = "activityC")
    private List<Comment> comments;

    @OneToMany(mappedBy = "activity")
    private List<Attachement> attachements;
}