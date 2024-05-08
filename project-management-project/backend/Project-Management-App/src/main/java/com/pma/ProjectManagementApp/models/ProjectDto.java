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
    private List<Integer> userIds; // Lista ID użytkowników
    private List<Integer> activityIds; // Lista ID aktywności
    private Integer teamId; // ID zespołu
    private Integer statusId; // ID statusu
    private Integer tableId; // ID tabeli statusów
}
