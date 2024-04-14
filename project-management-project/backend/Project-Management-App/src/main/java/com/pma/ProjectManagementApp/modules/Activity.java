package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer activityID;
    private String activityName;
    private String activityDescription; //TU TEZ STRING?
    private Date dueDate; //DATE?
    private Integer activityType;
    private Integer activityPriority;
}