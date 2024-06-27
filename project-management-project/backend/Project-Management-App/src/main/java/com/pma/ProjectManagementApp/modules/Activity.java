package com.pma.ProjectManagementApp.modules;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String activityDescription;
    private Date dueDate;
    private Integer activityType;
    private Integer activityPriority;

    @ManyToOne
    @JoinColumn(name = "tableID")
    private StatusTable tableA;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "labelID")
    @JsonIgnore
    private Label labelA;

    @ManyToOne
    @JoinColumn(name = "statusID")
    @JsonIgnore
    private Status activitiesStatus;

    @ManyToMany(mappedBy = "activitiesUser")
    @JsonIgnore
    private List<User> usersActivity;

    @OneToMany(mappedBy = "activityC", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "activity", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Attachement> attachements;

    @ManyToOne
    @JoinColumn(name = "projectID")
    @JsonIgnore
    private Project activityProject;

    @OneToOne
    @JoinColumn(name = "chechlistID")
    @JsonIgnore
    private Checklist checklist;
}