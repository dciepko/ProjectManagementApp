package com.pma.ProjectManagementApp.modules;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer statusID;
    private String statusName;

    @OneToMany(mappedBy = "status")
    private List<Project> projects;

    @OneToMany(mappedBy = "") // jeden status moze miec wiele aktywnosci ale jedna aktywnosc moze miec jeden status NWM
    private List<Activity> activitiesStatus;
}