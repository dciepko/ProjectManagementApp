package com.pma.ProjectManagementApp.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDto {
    private Integer userID;
    private String userName;
    private String userSurename;
    private String userNickname;
    private String userEmail;
    private String workingHours;
    private Boolean isOwner;

    private List<Integer> avatarIDs;
    private List<Integer> commentIDs;
    private List<Integer> attachementIDs;
    private List<Integer> projectIDs;
    private List<Integer> activityIDs;
    private List<Integer> teamIDs;
}
