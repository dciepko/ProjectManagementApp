package com.pma.ProjectManagementApp.models;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDto {
    private Integer userID;
    @NotNull
    private String userName;
    @NotNull
    private String userSurename;
    @NotNull
    @Size(min=6, max=15)
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
