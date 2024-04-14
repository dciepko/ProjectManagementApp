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
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer projectID;
    private String projectName;
    private String projectDescription;
    private Date startDate; //TU TEZ NWM JESZCZE
    private Date endDate;
}