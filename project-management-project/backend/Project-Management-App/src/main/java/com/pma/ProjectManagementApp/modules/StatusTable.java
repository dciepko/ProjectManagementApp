package com.pma.ProjectManagementApp.modules;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class StatusTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tableID;
    private String tableName;
    private String tableColor;

    @OneToMany(mappedBy = "table")
    @JsonIgnore
    private List<Project> projects;

    @OneToMany(mappedBy = "tableA")
    @JsonIgnore
    private List<Activity> activitiesTab;
}