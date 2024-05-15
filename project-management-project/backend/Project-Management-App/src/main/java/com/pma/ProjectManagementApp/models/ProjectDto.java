package com.pma.ProjectManagementApp.models;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ProjectDto {
    private Integer projectID;
    private String projectName;
    private String projectDescription;
    private Date startDate;
    private Date endDate;
    private Integer ownerID;
    private List<Integer> userIds;
    private List<Integer> activityIds;
    private Integer teamId;
    private Integer statusId;
    private Integer tableId;
}
