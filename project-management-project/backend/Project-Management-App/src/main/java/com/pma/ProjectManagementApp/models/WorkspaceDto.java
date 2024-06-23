package com.pma.ProjectManagementApp.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WorkspaceDto {
    private Integer workspaceID;
    private String workspaceName;
    private String workspaceDescription;
    private String logo;
    private Integer ownerID;
    private List<Integer> projectsIDs;
    private List<Integer> userIDs;
}
