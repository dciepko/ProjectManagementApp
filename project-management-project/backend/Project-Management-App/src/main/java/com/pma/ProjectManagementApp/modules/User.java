package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;
    private String userName;
    private String userSurename;
    private String userNickname;
    private String userEmail;
    private String userPassword;
    private String workingHours;
    private Boolean isOwner;

    @OneToMany(mappedBy = "userA")
    private List<Avatar> avatars;
    @OneToMany(mappedBy = "userCom")
    private List<Comment> comments;
    @OneToMany(mappedBy = "userAtt")
    private List<Attachement> attachements;

    @ManyToMany
    @JoinTable(name = "user_project", joinColumns = {@JoinColumn(name = "userID")},
            inverseJoinColumns ={@JoinColumn(name = "projectID")})
    private List<Project> projectsU;

    @ManyToMany
    @JoinTable(name = "user_activity", joinColumns = {@JoinColumn(name = "userID")},
            inverseJoinColumns ={@JoinColumn(name = "activityID")})
    private List<Activity> activitiesUser;

    @ManyToMany
    @JoinTable(name = "user_team", joinColumns = {@JoinColumn(name = "userID")},
            inverseJoinColumns ={@JoinColumn(name = "teamID")})
    private List<Team> teams;
}