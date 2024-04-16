package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer teamID;
    private String teamName;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User userTeam;

    @ManyToMany
    @JoinTable(name = "team_project", joinColumns = {@JoinColumn(name = "teamID")},
            inverseJoinColumns ={@JoinColumn(name = "projectID")})
    private List<Project> projectsTeam;
}