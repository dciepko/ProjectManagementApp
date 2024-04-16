package com.pma.ProjectManagementApp.modules;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String workingHours; //NWM CZY STRING
    private Boolean isOwner;

    @OneToMany(mappedBy = "userA")
    private List<Avatar> avatars;
    @OneToMany(mappedBy = "userTeam")
    private List<Team> teams;
    @OneToMany(mappedBy = "userCom") //Ale nwm bo jeden uz moze miec wiele kom ale jeden kom moze miec jednego uz
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
}