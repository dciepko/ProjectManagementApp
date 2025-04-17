package com.pma.ProjectManagementApp.modules;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Workspace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer workspaceID;
    private Integer ownerID;
    private String workspaceName;
    private String wsDescription;
    private String logo;

    @OneToMany(mappedBy = "workspace")
    @JsonIgnore
    private List<Project> wsProjects;

    @ManyToMany(mappedBy = "workspacesU")
    @JsonIgnore
    private List<User> users;
}
