package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Table {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tableID;
    private String tableName;
    private String tableColor;

    @OneToMany(mappedBy = "table")
    private List<Project> projects;

    @OneToMany(mappedBy = "tableA")
    private List<Activity> activitiesTab;
}