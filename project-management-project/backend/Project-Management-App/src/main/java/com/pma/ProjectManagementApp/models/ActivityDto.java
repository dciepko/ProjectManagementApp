package com.pma.ProjectManagementApp.models;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ActivityDto {
    private Integer activityID;
    private String activityName;
    private String activityDescription;
    private Date dueDate;
    private Integer activityType;
    private Integer activityPriority;

    private Integer tableID;
    private Integer labelID;
    private Integer statusID;
    private Integer projectID;

    private List<Integer> userIDs;
    private List<Integer> commentIDs;
    private List<Integer> attachementIDs;
}