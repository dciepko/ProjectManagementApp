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

    @ManyToMany(mappedBy = "teams")
    private List<User> usersTeam;

    @OneToMany(mappedBy = "team")
    private List<Project> projectsTeam;
}