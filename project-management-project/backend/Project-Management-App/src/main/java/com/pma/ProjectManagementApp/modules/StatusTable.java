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

    @ManyToOne
    @JoinColumn(name = "projectID")
    @JsonIgnore
    private Project project;

    @OneToMany(mappedBy = "tableA")
    @JsonIgnore
    private List<Activity> activitiesTab;
}